import grandObject from "../utils/grand-object";
import mergeObjects from "../utils/merge-objects";
import EventEmitter from "jenesius-event-emitter";
import FormEvent from "./FormEvent";
import {getCurrentInstance, inject as injectVue, provide as provideVue} from "vue";
import getPropFromObject from "../utils/get-prop-from-object";
import iteratePoints from "../utils/iterate-points";
import debug from "../debug/debug";
import getCastObject from "../utils/get-cast-object";
import {searchByComparison, searchChangesByComparison} from "../utils/search-changes-by-comparison";
import copyObject from "../utils/copy-object";
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

		const oldValues = copyObject(this.values);

		console.group('%csetting values', 'color: purple');
		console.log(this.values, values)
		console.log(searchByComparison(oldValues, values))
		this.#values = values;

		console.groupEnd()
	}

	dependencies: any[] = []

	#parent: Form | undefined;
	get parent() { return this.#parent };
	set parent(parent: Form | undefined) {
		this.#parent = parent;

		if (!this.parent) return;

		this.parent.subscribe(this);

		this.parent.oninput(this.name as string, (event: any) => {
			this.notify('value', event)
		})
	}

	constructor(params: Partial<FormParams>) {
		super();

		this.name = params.name;
		const currentInstance = !!getCurrentInstance();

		console.log('%c[new-form]%c', 'color: blue', 'color:black',this.name, Form.getParentForm());
		if (currentInstance) this.parent = Form.getParentForm();
		if (currentInstance) provideVue(Form.PROVIDE_NAME, this); // Default providing current form for children.
	}

	private mergeValues(data: any) {
		mergeObjects(this.values, data);
	}
	private notify(event: FormEvent['type'], model: any ) {

		switch (event) {
			case "value": {
				console.log(`%c[${Form.restoreFullName(this)}]%c Generation new global event %c${event}%c`,'color: blue', 'color: black', 'color: red', 'color: black', model);
				this.emit(Form.EVENT_VALUE, FormEvent.newValue(model)); // Generate global event

				// Generate event-value for each point
				iteratePoints(model).forEach(point => {
					console.log(`Generation new event-value for %c${point.name}%c`, 'color: red', 'color: black');

					this.emit(
						Form.getEventValueByName(point.name),
						getPropFromObject(this.values, point.name)
					)
				});

				break;
			}
		}
	}

	setValues(data: any):void {
		if (this.parent) {
			return void this.parent.setValues({
				[this.name as string]: data
			});
		}
		const grandData = grandObject(data);
		this.mergeValues(grandData);
		this.notify('value', grandData);
	}
	getValueByName(name: string) {
		return getPropFromObject(this.values, name);
	}

	change(data: any) {
		// Mark changes
		this.setValues(data);
	}

	subscribe<T extends {parent?: any}>(element: T) {
		this.dependencies.push(element);
	}
	oninput(name: string, callback: (newValue: any) => void) {
		return this.on(Form.getEventValueByName(name), callback)
	}
	cleanValues(values?: any) {
		debug.msg('Cleaning values')
		this.values = {};
		this.setValues(values || {});
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
}

interface FormParams {
	name: string
}
interface FormDependence {
	change(data: any): void,
	setValues(data: any): void,
}

