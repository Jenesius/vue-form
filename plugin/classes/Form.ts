import EventEmitter from "jenesius-event-emitter";
import {inject as injectVue, provide as provideVue} from "vue";
import getPropFromObject from "../utils/getPropFromObject";
import {Values} from "../types";
import {deepenObject} from "../utils/deepenValue";
import mergeObjects from "../utils/mergeObjects";

export default class Form extends EventEmitter{
	static PROVIDE_NAME			 = 'form-controller';
	
	static getParentForm(): Form {
		return injectVue(Form.PROVIDE_NAME) as Form;
	}
	/**=========**/
	
	name: string;
	
	// Массив Объект-Контроллер, используемый для работы с зависимыми элементами
	dependencies: any[] = [];
	parentForm: Form | null = null;
	#values: Values = {}
	
	
	
	get values() {
		return this.#values;
	}
	set values(a: any) {
		this.#values = a;
	}
	
	constructor(params: any = {}) {
		super();
		
		this.name = params.name;
		
		this.parentForm = injectVue(Form.PROVIDE_NAME, null) as Form | null;
		if (this.parentForm) this.parentForm.depend(this);
		
		provideVue(Form.PROVIDE_NAME, this);
	}
	
	/**
	 * @description Метод-контроллер, используемый для инпутов
	 * */
	input(name: string, v: any){
		this.changeByName(name, v);
	}
	
	protected recursiveChangeItem(values:any, path: string = '') {
		
		this.dependencies.forEach(dep => {
			dep.change(getPropFromObject(values, dep.name));
		})
		return;
		
		Object.keys(values).forEach(key => {
			const stepName = `${path}${key}`;
			const v = values[key];
			
			this.getDependenciesByName(stepName).forEach(i => i.change(v));
			
			if (typeof v === 'object' && v !== null) {
				this.recursiveChangeItem(v, `${stepName}.`);
			}
		})
	}
	
	/**
	 * @description Частный случай setValues, используется для input элементов.
	 *
	 * change, changeByName - прослойка над setValue
	 * */
	changeByName(name: string, value: any) {
		this.setValues({
			[name]: value
		});
	}
	change(values: Values){
		this.setValues(values);
	}
	/**
	 * @description Установка новых значений формы.
	 * */
	setValues(values: Values){
		const _v = deepenObject(values);
		this.mergeValues(_v);
		/**
		 * поменять notify input, сделать его как метод для array
		 * */
		this.recursiveChangeItem(this.values)
	}
	
	cleanValues(values?: Values) {
		this.#values = {};
		this.setValues(values || {});
	}
	
	/**
	 * @description Метод для сливания объектов
	 * */
	protected mergeValues(values: Values) {
		mergeObjects(this.values, values);
	}
	
	/***TEST***/
	unsubscribe(item: any){
		const index = this.dependencies.indexOf(item);
		if (index === -1) return;
		this.dependencies.splice(index, 1);
	}
	depend(item: any) {
		this.dependencies.push(item)
		
		return () => this.unsubscribe(item)
	}
	dependInput(name: string, i: any) {
		i.name = name;
		
		return this.depend(i);
	}
	
	/**
	 * @description Вернёт зависимости, которые связаны с переданным именем.
	 * @example address -> address address.city address.description address.name
	 * @example address.city -> address address.city
	 * */
	getAssociatedDependencies(name: string) {
		return this.dependencies.filter(dep => {
			const depName = dep.name;
			return depName.startsWith(name) || name.startsWith(depName);
		})
	}

	/**
	 * @description Вернёт точное совпадение зависимостей по имени
	 * */
	getDependenciesByName(name: string): any[] {
		return this.dependencies.filter(i => i.name === name);
	}
	
	
	
	/**
	 * @description Получение значения по имени элемента
	 * */
	getValueByName(name: string) {
		return getPropFromObject(this.values, name);
	}
	
	
	
	handleDE = {
		defineProperty: (target: any, name: string | symbol, attributes: PropertyDescriptor): boolean=>{
			const value = attributes.value;
			
			target[name] = attributes.value;
			
			if (value) this.recursiveDisableItem(name.toString());
			else this.recursiveEnableItem(name.toString())
			
			return true;
		},
		deleteProperty: (target: any, name: string | symbol): boolean => {
			name = name.toString();
			delete target[name];
			
			this.recursiveEnableItem(name)
			
			return true;
		}
	}
	#disabledElements:{
		[name: string]: boolean
	} = new Proxy({}, this.handleDE);
	
	#disabled: boolean = false;
	get disabled() {
		return this.#disabled;
	}
	set disabled(value: boolean){
		this.#disabled = value;
		
		if (value) {
			this.#disabledElements = new Proxy({}, this.handleDE);
			this.recursiveDisableItem();
		} else {
			Object.keys(this.disabledElements).forEach(key => delete this.#disabledElements[key])
		}

	}
	
	get disabledElements(){
		return this.#disabledElements;
	}
	
	protected recursiveDisableItem(name?: string) {
		// No name - disable all elements
		if (!name) return this.dependencies.forEach(dep => dep.disable())
		
		this.getAssociatedDependencies(name)
		.forEach(dep => {
			if (dep.name.startsWith(name)) return dep.disable(); // Точное совпадение
			dep.disable(name.slice(dep.name.length + 1));
		})
	}
	protected recursiveEnableItem(name?: string) {
		
		if (!name) {
			this.dependencies.forEach(dep => dep.enable())
			return;
		}
		
		this.dependencies.filter(dep => name.startsWith(dep.name))
		.forEach(dep => {
			if (dep.name === name) return dep.enable(); // Точное совпадение
			dep.enable(name.slice(dep.name.length + 1));
		})
	}
	
	
	disable(name?: string){
		if(name) this.#disabledElements[name] = true;
		else this.disabled = true;
	}
	enable(name?: string) {
		if (name) this.#disabledElements[name] = false;
		else this.disabled = false;
	}
	

	
	/**
	 * @description
	 * 	Если найдено имя равное или то, с которого начинается запрашиваемое имя(
	 * 	значит он является дочерним) - вернёт true
	 * */
	getDisabledByName(name: string) {
		
		return this.#disabledElements[name];
	}
	
	
}
