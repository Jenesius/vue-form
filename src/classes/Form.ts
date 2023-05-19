import grandObject from "../utils/grand-object";
import mergeObjects from "../utils/merge-objects";
import EventEmitter from "jenesius-event-emitter";
import FormEvent from "./FormEvent";
import {getCurrentInstance, inject as injectVue} from "vue";
import getPropFromObject from "../../plugin/utils/get-prop-from-object";
import {provide as provideVue} from "@vue/runtime-core";
import checkNameInObject from "../utils/check-name-in-object";
/**
 * Main principe : GMN
 * G - Grand
 * M - Merge
 * N - Notify
 * */
export default class Form extends EventEmitter implements FormDependence {
	static EVENT_NAME 				= 'form-event'
	static PROVIDE_NAME			 	= 'form-controller';

	static getParentForm() {
		return injectVue<Form | undefined>(Form.PROVIDE_NAME, undefined);
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

	dependencies: any[] = []

	#parent: Form | undefined;
	get parent() { return this.#parent };
	set parent(parent: Form | undefined) {
		this.#parent = parent;

		if (!this.parent) return;

		this.parent.subscribe(this);

		this.parent.on(Form.EVENT_NAME, (event: FormEvent) => {
			console.group('%cnew-event', 'color: red');
			console.log(event, this.name);

			if (checkNameInObject(event.payload, this.name as string))
				this.emit(Form.EVENT_NAME, getPropFromObject(event.payload, this.name as string))

			console.groupEnd()
		})
	}

	constructor(params: Partial<FormParams>) {
		super();

		this.name = params.name;
		const currentInstance = !!getCurrentInstance();

		console.log(this.name, Form.getParentForm());
		if (currentInstance) this.parent = Form.getParentForm();
		if (currentInstance) provideVue(Form.PROVIDE_NAME, this); // Default providing current form for children.
	}

	private mergeValues(data: any) {
		mergeObjects(this.values, data);
	}
	private notify(event: FormEvent['type'], model: any ) {
		// - Генерация эвента для всей модели
		console.log('Generation new event', model);

		this.emit(Form.EVENT_NAME, FormEvent.newValue(model));
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

	oninput(name: string, callback: (newValue: any, oldValue: any) => void) {
		return this.on(Form.EVENT_NAME, data => {
			callback(0, 0);
		})
	}
}

interface FormParams {
	name: string
}
interface FormDependence {
	change(data: any): void,
	setValues(data: any): void,
}

