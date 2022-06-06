import EventEmitter from "jenesius-event-emitter";
import {inject as injectVue, provide as provideVue} from "vue";
import getPropFromObject from "../utils/getPropFromObject";
import {FunctionHandleData, Values} from "../types";
import {deepenObject} from "../utils/deepenValue";
import mergeObjects from "../utils/mergeObjects";
import {runPromiseQueue} from "../utils/run-promise-queue";

export default class Form extends EventEmitter{
	static PROVIDE_NAME			 = 'form-controller';
	static EVENT_READ			 = 'read';
	static EVENT_SAVE			 = 'save';
	
	/**
	 * @description Вызывается всякий раз, когда форма была изменена. Внимание!
	 * Не установлено значение setValues, а изменена
	 * */
	static EVENT_CHANGE		 	 = 'changed';
	
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
	
	/**
	 * Рекурсивное зименение значений.
	 * По фатку в конечной реализации оно нихуя не рекурсивное.
	 * Реализация 2: для каждой зависимости получает значение из values и устанавливаем его
	 * Реализация 1: идем рекурсивно по всем значениям, находим подходящие зависимости
	 * и устанвливаем значения для них. Основная проблема в количетсве итераций.
	 * Нужно это протестировать
	 * И переименовать метод: changeValuesOfItem(values: any);
	 * А лучше добавить новый просто метод, рекурсию сохранив
	 *
	 * Можно изменить метод getPropFromObject, или реализовать другую версию,
	 * которая будет кидать экспешен, если значения нет.
	 * Таким образом мы сможем понять, имеется ли новое значение в объекте.
	 * А если мы устанавливаем например
	 * address: {
	 *     city: "Mogilev"
	 * }
	 * В таком случае address.description - должен установится в null/undefined
	 *
	 * Можно реализовать метод getRelevantedProps - для
	 * */
	protected changeValuesOfItem(values: any) {
		this.dependencies.forEach(dep => {
			dep.change(getPropFromObject(values, dep.name));
		})
	}
	protected recursiveChangeItem(values:any, path: string = '') {
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
		this.changeValuesOfItem(this.values)
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
			console.log('define', name);

			const value = attributes.value;
			
			
			console.log('Clean not relevanted names.');
			Object.keys(target).forEach(disabledName => {
				if (disabledName.startsWith(name.toString())) {
					delete target[disabledName];
					console.log(`Delete disable for %c${disabledName}`, 'color: red')
				}
			})
			
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
	
	
	
	#disabled: boolean = false;
	
	#disabledElements:{
		[name: string]: boolean
	} = new Proxy({}, this.handleDE);
	
	get disabledElements(){
		return this.#disabledElements;
	}
	
	
	get disabled() {
		return this.#disabled;
	}
	set disabled(value: boolean){
		/**
		 * if (this.#disabled === value) is wrong:
		 * f.disable()
		 * f.enable('address')
		 * f.disable() <-- Not working.
		 * */
		
		this.#disabled = value;
		// installation disabledElements
		this.#disabledElements = new Proxy({}, this.handleDE);
		
		if (value)
			this.recursiveDisableItem()
		else
			this.recursiveEnableItem()
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
		
		this.getAssociatedDependencies(name)
		.forEach(dep => {
			console.log(dep, name);
			if (dep.name.startsWith(name)) return dep.enable(); // Точное совпадение
			dep.enable(name.slice(dep.name.length + 1));
		})
	}
	
	
	disable(name?: string){
		if (name) this.disableByName(name);
		else this.disabled = true;
	}
	enable(name?: string) {
		if (name) this.enableByName(name);
		else this.disabled = false;
	}
	

	protected disableByName(name: string) {
		if (this.disabled) delete this.#disabledElements[name];
		else this.#disabledElements[name] = true;
	}
	protected enableByName(name: string) {
		this.#disabledElements[name] = false;
	}
	/**
	 * @description Функция вернёт наиболее релевантное значения для поля по име
	 * ни. Для address.city.name более релевантным является address.city, чем
	 * address.
	 * */
	getDisabledByName(name: string): boolean {

		let refName = name;
		// Start with the most relevant level (From the End)
		while(refName.length !== 0) {
			if (refName in this.disabledElements) return this.disabledElements[refName]
			
			const dotIndex = refName.lastIndexOf('.');
			if (dotIndex === -1) refName = '';
			refName = refName.slice(0, dotIndex);
		}
		
		// Not founded relevant value.
		return this.#disabled;
	}
	
	
	/**
	 * @description Function for read data (For example from DataBase)
	 * */
	private readData: FunctionHandleData = () => Promise.resolve();
	/**
	 * @description Method takes read functions from all children elements, and
	 * run it
	 */
	get read() {
		const array: Array<FunctionHandleData> =
			this.dependencies.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
				if (elemController.read) acc.push(elemController.read);
				return acc;
			}, []);
		
		if (this.readData) array.push(() =>
			runPromiseQueue([() => this.readData?.(), (data: any) => this.emit(Form.EVENT_READ, data)])
		)
		
		return () => Promise.all(array.map(c => c()));
	}
	set read(callback: FunctionHandleData){
		this.readData = callback;
	}
	
	/**
	 * @description Function for save data (Update/Create)
	 * */
	private saveData: FunctionHandleData = () => Promise.resolve();
	
	get save() {
		
		const array: Array<FunctionHandleData> =
			this.dependencies.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
				if (elemController.save) acc.push(elemController.save);
				return acc;
			}, []);
		
		array.push(() =>
			runPromiseQueue([
				() => this.saveData?.(),
				(data: any) => this.emit(Form.EVENT_SAVE, data)
			])
		)
		
		return () => Promise.all(array.map(c => c()));
	}
	set save(callback: FunctionHandleData) {
		this.saveData = callback;
	}
	
}

