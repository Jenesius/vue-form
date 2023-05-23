import grandObject from "../utils/grand-object";
import mergeObjects from "../utils/merge-objects";
import EventEmitter from "jenesius-event-emitter";
import FormEvent from "./FormEvent";
import {getCurrentInstance, inject as injectVue, provide as provideVue} from "vue";
import getPropFromObject from "../utils/get-prop-from-object";
import iteratePoints from "../utils/iterate-points";
import debug from "../debug/debug";
import getCastObject from "../utils/get-cast-object";
import copyObject from "../utils/copy-object";
import {compareDifference, compareMergeChanges} from "../utils/compare-changes";
import DependencyQueue from "./DependencyQueue";
import CompareEvent from "./CompareEvent";
/**
 * Main principe : GMN
 * G - Grand
 * M - Merge
 * N - Notify
 * Важно помнить про данный принцип. Любой последующие этап не может быть вызван без предыдущего. Это значит, что перед
 * Merge(M) всегда должен быть выполнен и Grand(G), для Notify(N) всегда должны быть выполнены M и G соответственно.
 */
export default class Form extends EventEmitter implements FormDependence {
	static EVENT_NAME 				= 'form-event'
	static PROVIDE_NAME			 	= 'form-controller';
	static EVENT_CHANGE				= 'change';
	static EVENT_VALUE				= 'value';

	static getParentForm() {
		return injectVue<Form | undefined>(Form.PROVIDE_NAME, undefined);
	}
	static getEventValueByName(name: string) {
		return `${Form.EVENT_VALUE}:${name}`
	}
	static restoreFullName<T extends {name?: string, parent?: Form}>(elem: T): string {
		if (elem.parent) return `${Form.restoreFullName(elem.parent)}.${elem.name}`;
		return elem.name || '';
	}
	/**
	 * @description Name of Entity.
	 * */
	name?: string

	#values = {}
	get values(): any {
		if (this.parent) {
			return this.parent.getValueByName(this.name as string);
		}
		return this.#values;
	};
	private set values(values: any) {

		// const oldValues = copyObject(this.values);

		console.group('%csetting values', 'color: purple');

		const grandValues = grandObject(values);
		const event = new CompareEvent(grandValues, this.values);
		this.dispatchEvent(event);

		this.#values = grandValues;

		console.groupEnd()
	}

	dependencies = new DependencyQueue(this)

	#parent: Form | undefined;
	get parent() { return this.#parent };
	set parent(parent: Form | undefined) {
		this.#parent = parent;
	}

	constructor(params: Partial<FormParams>) {
		super();

		this.name = params.name;
		const currentInstance = !!getCurrentInstance();

		console.log('%c[new-form]%c', 'color: blue', 'color:black',this.name, Form.getParentForm());
		if (currentInstance) {
			const parent = Form.getParentForm();
			if (parent)
				parent.subscribe(this);
		}
		if (currentInstance) provideVue(Form.PROVIDE_NAME, this); // Default providing current form for children.
	}

	private notify(event: FormEvent['type'], model: any ) {

		switch (event) {
			case "value": {
				console.log('New changes', model); //Changes
				console.log(`%c[${Form.restoreFullName(this)}]%c Generation new global event %c${event}%c`,'color: blue', 'color: black', 'color: red', 'color: black', model);
				// this.emit(Form.EVENT_VALUE, FormEvent.newValue(model)); // Generate global event

				// Generate event-value for each point
				iteratePoints(model).forEach(point => {
					console.log(`Generation new event-value for %c${point.name}%c`, 'color: red', 'color: black', getPropFromObject(this.values, point.name));

					this.emit(
						Form.getEventValueByName(point.name),
						getPropFromObject(this.values, point.name)
					)
				});

				break;
			}
		}
	}

	setValues(changes: any):void {
		if (this.parent) {
			console.log(`[%c${this.name}%c] emit changes to parent [%c${this.parent.name}%c]`, 'color: red', 'color: black', 'color: red', 'color: black');
			return void this.parent.setValues({
				[this.name as string]: changes
			});
		}

		console.group('[SET VALUES]');

		changes = grandObject(changes);
		console.log('%cGrand Object:', 'color: blue', changes);
		console.log('%cValues Object(copied):', 'color: blue', copyObject(this.values));
		console.log('%cCompare Merge Changes', 'color: blue', compareMergeChanges(this.values, changes))

		const event = new CompareEvent(compareMergeChanges(this.values, changes));
		mergeObjects(this.values, changes);

		console.log('%cEvent:', 'color: blue', event);
		console.log('%cNew Values', 'color: blue', this.values)

		console.groupEnd();

		this.dispatchEvent(event);

	}

	getValueByName(name: string) {
		return getPropFromObject(this.values, name);
	}

	change(data: any) {
		// Mark changes
		this.setValues(data);
	}

	subscribe(element: any) {
		this.dependencies.add(element);
	}
	unsubscribe(element: any) {
		this.dependencies.remove(element);
	}
	oninput(name: string, callback: (newValue: any) => void) {
		return this.on(Form.getEventValueByName(name), callback)
	}
	dispatchEvent<T extends FormEvent>(event: T) {


		if (event instanceof CompareEvent) {
			console.log(`[%c${this.name}%c]: %c${event?.comparison.length ? '' : 'NOT EFFECT'}%c`, 'color: red', 'color: black', 'color: purple', 'color: black', 'Dispatch event', event)

			// Проходим по всем дочерним элементам и уведомляем их
			this.dependencies.forEach(dep => {
				if (dep.name) {
					dep?.dispatchEvent(CompareEvent.restoreByName(event, dep.name));
				}
			})

			event.comparison.forEach(item => {
				console.log(`[%c${this.name}%c] Emit new value event to %c${item.name}`, 'color: red', 'color: black', 'color: red');
				this.emit(Form.getEventValueByName(item.name), item.newValue);
			})

		}




	}
	/**
	 * @description Method return values in {[key]: value} format. If names provided return just values for names.
	 */
	getValues(...names: string[]) {
		if (!names || !names.length) return this.values;

		const cast = names.reduce((acc: {[key: string]: boolean}, name) => {
			acc[name] = true
			return acc;
		}, {})

		return getCastObject(this.values, grandObject(cast));
	}
	cleanValues(values?: any) {
		debug.msg('Cleaning values')

		/**
		 * WARNING WARNING WARNING WARNING WARNING
		 * в данном случаем мы сперва устанавливаем пустое значение, а потому уже нужное.
		 * Эффективнее сразу устанавливать нужно значение
		 * WARNING WARNING WARNING WARNING WARNING
		 * */

		this.values = values || {};

	}
}

interface FormParams {
	name: string
}
interface FormDependence {
	change(data: any): void,
	setValues(data: any): void,
}

