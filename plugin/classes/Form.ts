import EventEmitter from "jenesius-event-emitter";
import {inject as injectVue, provide as provideVue} from "vue";
import FormErrors from "./FormErrors";
import {FormDependence, FunctionHandleData, Values} from "../types";

import mergeObjects from "../utils/merge-objects";
import runPromiseQueue from "../utils/run-promise-queue";
import replaceValues from "../utils/replace-values";
import getCastObject from "../utils/get-cast-object";
import grandObject from "../utils/grand-object";
import findNearestNameFromArray from "../utils/find-nearest-name-from-array";
import checkCompositeName from "../utils/check-composite-name";
import deletePropByName from "../utils/delete-prop-by-name";
import getPropFromObject from "../utils/get-prop-from-object";

export default class Form extends EventEmitter implements FormDependence{
	static PROVIDE_NAME			 = 'form-controller';
	static EVENT_READ			 = 'read';
	static EVENT_SAVE			 = 'save';
	static EVENT_DISABLE		 = 'disable';
	static EVENT_ENABLE			 = 'enable';
	
	static EVENT_SUBSCRIBE		 = 'subscribe';
	static EVENT_UNSUBSCRIBE	 = 'unsubscribe';
	
	static EVENT_VALUE			 = 'value';
	static EVENT_UPDATE_ABILITY  = 'ability:update';
	
	/**
	 * @description Вызывается всякий раз, когда форма была изменена. Внимание!
	 * Не установлено значение setValues, а изменена.
	 */
	static EVENT_CHANGED		 	 = 'changed';
	static EVENT_DISABLED		 	 = 'disabled';

	/**
	 * @description. Find the parent Form. Using for subscribe elements.
	 * Bottleneck of current library: inject, provide should state outside classes.
	 */
	static getParentForm(): Form | undefined {
		return injectVue<Form>(Form.PROVIDE_NAME);
	}

	/**
	 * @description Name of current entity. Can be undefined for parent Form.
	 */
	name?: string;

	version?: any

	/**
	 * @description Children of current form. Array of subscribed elements.
	 */
	dependencies: FormDependence[] = [];
	
	/**
	 * @description Link to parent Form
	 */
	parentForm?: Form;
	
	/**
	 * @description Prettify values of Form. Modified after grand-object.ts
	 */
	#values: Values = {}
	
	/**
	 * @description Prettify changes of Form.
	 * @example
	 * {
	 *     user: { name: true, age: true }
	 * }
	 * Mean that "user.name" and "user.age" from Form.values was changed.
	 */
	#changes = {};
	
	/**
	 * @description Property for displaying warns. On current time don't use.
	 */
	readonly #debug:boolean = false;
	
	/**
	 * @description If true - all elements by default will be blocked.
	 */
	#disabled: boolean = false;

	/**
	 * @description Function for read data (For example from DataBase)
	 */
	#readData: FunctionHandleData = () => Promise.resolve();
	
	/**
	 * @description Function for save data (Update/Create)
	 */
	#saveData: FunctionHandleData = () => Promise.resolve();
	
	/**
	 * @description Getting cast of Form.values
	 * @return Changed values.
	 */
	get changes() {
		return getCastObject(this.values, this.#changes);
	}
	/**
	 * @description Show if the form has been changed.
	 * @return true - if #changes includes some values or one of dependencies stay in changed status.
	 */
	get changed() {
		return !!Object.keys(this.#changes).length || !!this.dependencies.find(d => d.changed);
	}
	
	/**
	 * Getter/Setter for values.
	 */
	get values() {
		return this.#values;
	}
	set values(a: any) {
		this.#values = a;
	}

	get debug(){
		return this.#debug
	}
	
	constructor(params: FormParams = {}) {
		super();
		
		if (params.name)
			this.name = params.name;

		this.#debug = Boolean(params.debug);

		// If params don't include parent: false, looking for a form, in case of success subscribe current form to parent.
		if (params.parent !== false) {
			this.parentForm = Form.getParentForm();
			if (this.parentForm) this.parentForm.depend(this);
		}

		provideVue(Form.PROVIDE_NAME, this); // Default providing current form for children.
	}
	
	private markChanges(values: any) {
		if (!values) {
			console.log(`%cUndefined values%c`, 'color:red', 'color: black', this);
			return;
		}
		
		const v = grandObject(replaceValues(values));
		mergeObjects(this.#changes, v);
		
		this.emit(Form.EVENT_CHANGED, this.changed);
	}
	/**
	 * @description Method for input-component.
	 * */
	input(name: string, v: any){
		this.change({
			[name]: v
		})
	}
	
	/**
	 * Рекурсивное изменение значений.
	 * В конечной реализации оно нихуя не рекурсивное.
	 * Реализация 2: для каждой зависимости получает значение из values и устанавливаем его
	 * Реализация 1: идем рекурсивно по всем значениям, находим подходящие зависимости
	 * и устанавливаем значения для них. Основная проблема в количестве итераций.
	 * Нужно это протестировать
	 * И переименовать метод: setValuesOfItem(values: any);
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
	protected setValuesOfItem(values: any) {
		this.dependencies.forEach(dep => {
			if (!dep.name) return;
			dep.setValues?.(getPropFromObject(values, dep.name));
		})
	}
	// На данный момент не используется. Подсвечивается поскольку рекурсивная
	protected recursiveChangeItem(values:any, path: string = '') {
		Object.keys(values).forEach(key => {
			const stepName = `${path}${key}`;
			const v = values[key];
			
			this.getDependenciesByName(stepName).forEach(i => i.change?.(v));
			
			if (typeof v === 'object' && v !== null) {
				this.recursiveChangeItem(v, `${stepName}.`);
			}
		})
	}
	/**
	 * @description Clean changes (Not revert Values!). Rewrite changes If new values provided
	 * */
	cleanChanges(values = {}) {
		this.dependencies.forEach(dep => {
			dep.cleanChanges?.();
		})
		this.cleanCurrentChanges(values);
	}

	/**
	 * @description Clean just current form without clean children depend on items.
	 * */
	cleanCurrentChanges(values = {}) {
		this.#changes = grandObject(replaceValues(values));
		this.emit(Form.EVENT_CHANGED, this.changed);
	}

	change(values?: Values){
		this.setValues(values);
		if (values) this.markChanges(values);
	}
	
	protected setValuesByName(name: string, value: any) {
		this.setValues({
			[name]: value
		});
	}
	/**
	 * @description Установка новых значений формы.
	 * */
	setValues(values?: Values){
		if (values) this.mergeValues(grandObject(values));
		this.emit(Form.EVENT_VALUE, values);

		this.setValuesOfItem(this.values)
	}
	/**
	 * @description Method using for clear field. Dont set NULL. Remove field
	 * from values.
	 * @example
	 * { address: { city: 'Some' }, name: 'jack' } clearField('address')
	 * {name: 'jack'}
	 * */
	cleanField(name: string) {
		deletePropByName(this.values, name);
		deletePropByName(this.#changes, name);
		this.cleanChanges(this.#changes);
	}
	cleanValues(values?: Values) {
		this.#values = {};
		this.setValues(values || {});
	}
	
	/**
	 * @description Merging values.
	 * */
	protected mergeValues(values: Values) {
		mergeObjects(this.values, values);
	}

	/**
	 * @description subscribe is alice for depend. Subscribe element to Form.
	 * */
	subscribe(item: any) {
		return this.depend(item);
	}
	depend(item: any) {
		this.dependencies.push(item);
		this.emit(Form.EVENT_SUBSCRIBE, item);


		try {
			item.on(Form.EVENT_CHANGED, () => this.emit(Form.EVENT_CHANGED, this.changed));
		} catch (e) {

		}
		// Из-за того, что мы эмитим чужое значение!
		// Form.proxyEvent(item, this, Form.EVENT_CHANGED);

		return () => {
			this.unsubscribe(item)

		}
	}
	static proxyEvent(from: any, to: any, eventName: string) {
		if (from.on && to.emit)
			from.on(eventName, (...arg: any) => to.emit(eventName, ...arg));
	}
	unsubscribe(item: any){
		const index = this.dependencies.indexOf(item);
		if (index === -1) return;
		this.dependencies.splice(index, 1);
		this.emit(Form.EVENT_UNSUBSCRIBE, item);
	}

	dependInput(name: string, i: any) {
		i.name = name;
		
		return this.depend(i);
	}
	
	/**
	 * @description Вернёт зависимости, которые связаны с переданным именем.
	 * @example address -> address address.city address.description address.name
	 * @example address.city -> address address.city
	 *
	 * @description Данный метод необходим для всевозможного поиска связанных элементов. В случае с "address.city", мы
	 * можем иметь составной элемент с именем "address", который может содержать (а может и нет) элемент "city". В слу
	 * чае блокировки, необходимо заблокировать, как "address.city", так и сказать составному элементу "address" о блоки
	 * ровке элемента "city".
	 * */
	getAssociatedDependencies(name: string) {
		function t<T extends FormDependence>(dep: T): dep is T & {name: string}   {
			if (!dep.hasOwnProperty('name') || dep.name === undefined) return false;
			const depName = dep.name;
			return depName.startsWith(name) || name.startsWith(depName);
		}
		
		return this.dependencies.filter(t)
	}
	/**
	 * @description Return dependencies whose name exact matches the provided name.
	 * */
	getDependenciesByName(name: string) {
		return this.dependencies.filter(i => i.name === name);
	}

	/**
	 * @description Function using for get value by name.
	 * */
	getValueByName(name: string) {
		if (!name) throw FormErrors.TryToGetValueWithoutName();
		return getPropFromObject(this.values, name);
	}

	/**
	 * @description The Boolean disabled attribute, when present, makes the element not mutable, focusable,
	 * or even submitted with the form.
	 * @return {Boolean} isDisabled
	 * */
	get disabled() {
		return this.#disabled;
	}
	/**
	 * @description Setter for toggle disabled prop. Current function will update disabled state of children elements.
	 * */
	set disabled(value: boolean){
		this.#disabled = value;
		this.abilities = this.getProxyAbilities();
		
		if (value)
			this.disableChildren()
		else
			this.enableChildren()
	}
	
	disable(names?: string | string[]){
		if (typeof names === "string") names = [names];
		
		this.emit(Form.EVENT_DISABLE, names);
		
		// Provided undefined -> full disable form
		if (!names) return this.disabled = true;

		names.forEach(name => this.disableByName(name)) ;
	}
	
	/**
	 * @description Method for disable all or just provided children element.
	 * */
	protected disableChildren(name?: string) {
		// No name - disable all elements
		if (!name) return this.dependencies.forEach(dep => dep.disable())
		
		this.getAssociatedDependencies(name)
		.forEach(dep => {
			if (dep.name.startsWith(name)) return dep.disable(); // Точное совпадение
			dep.disable(name.slice(dep.name.length + 1));
		})
	}
	/**
	 * @description Method for enable all or just provided children element.
	 * */
	protected enableChildren(name?: string) {
		
		if (!name) {
			this.dependencies.forEach(dep => dep.enable())
			return;
		}
		
		this.getAssociatedDependencies(name)
		.forEach(dep => {
			if (dep.name.startsWith(name)) return dep.enable(); // Точное совпадение
			dep.enable(name.slice(dep.name.length + 1));
		})
	}
	
	

	enable(names?: string | string[]) {
		if (typeof names === "string") names = [names];
		
		this.emit(Form.EVENT_ENABLE, names);
		
		if (!names) return  this.disabled = false;
		names.forEach(name => this.enableByName(name)) ;
	}
	

	
	private getProxyAbilities(){
		return new Proxy({}, 	 {
			defineProperty: (target: any, name: string, attributes: PropertyDescriptor): boolean=>{
				
				const value = attributes.value;
				
				// Находим всех дочерних элементов и удаляем их
				Object.keys(target).forEach(childrenName => {
					if (checkCompositeName(name, childrenName))
						delete target[childrenName];
				})
				
				const nearestName = findNearestNameFromArray(name, Object.keys(target));
				
				// @ts-ignore
				// Если родитель находится в таком же состоянии
				if (
					(nearestName && value === target[nearestName]) ||
					(!nearestName && value === !this.disabled)
				) {}
				else {
					target[name] = attributes.value;
				}
				
				
				if (value) this.enableChildren(name.toString());
				else this.disableChildren(name.toString())
				
				return true;
			},
			deleteProperty: (target: any, name: string | symbol): boolean => {
				name = name.toString();
				delete target[name];
				
				if (this.disabled) this.disableChildren(name)
				else this.enableChildren(name)
				
				return true;
			}
		})
	}
	abilities: {
		[name: string]: boolean
	} = this.getProxyAbilities()

	/**
	 * @param {String} name. Element name.
	 * @param {Boolean} mark. True - Enable, false: disable
	 *
	 * @description Method was simplified
	 * */
	private markElementForAbility(name: string, mark: boolean) {
		return this.abilities[name] = mark;
		
		const nearestName = findNearestNameFromArray(name, Object.keys(this.abilities));
		
		if (!nearestName) {
			this.abilities[name] = mark;
			
			return ;
		}
		
		return this.abilities[name] = mark;
		/*
		if (this.abilities[nearestName] === mark) return this.abilities[name] = mark;
		// Ближайший элемент заблокирован и нужно заблокировать
		if (!this.abilities[nearestName] && !mark) return;
		// Ближайший элемент разблокирован и нужно разблокировать
		if (this.abilities[nearestName] && mark) return;
		*/
	}
	
	protected disableByName(name: string) {
		return this.markElementForAbility(name, false);
	}
	protected enableByName(name: string) {
		return this.markElementForAbility(name, true);
	}
	/**
	 * @description Функция вернёт наиболее релевантное значения для поля по име
	 * ни. Для address.city.name более релевантным является address.city, чем
	 * address.
	 * */
	getDisabledByName(name: string): boolean {
		const nearestName = findNearestNameFromArray(name, Object.keys(this.abilities));
		
		if (!nearestName) return this.disabled;
		
		return !this.abilities[nearestName];
	}

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
		
		array.push(() =>
			runPromiseQueue([
				() => this.#readData?.(),
				(data: any) => this.emit(Form.EVENT_READ, data)
				]
			)
		)
		
		return () => Promise.all(array.map(c => c()));
	}
	set read(callback: FunctionHandleData){
		this.#readData = callback;
	}

	/**
	 * @description The same with read. After saving run cleanChanges.
	 */
	get save() {
		const array: Array<FunctionHandleData> =
			this.dependencies.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
				if (elemController.save) acc.push(elemController.save);
				return acc;
			}, []);
		
		array.push(() =>
			runPromiseQueue([
				() => this.#saveData?.(),
				(data: any) => this.emit(Form.EVENT_SAVE, data),
				() => this.cleanChanges()
			])
		)
		
		return () => Promise.all(array.map(c => c()));
	}
	set save(callback: FunctionHandleData) {
		this.#saveData = callback;
	}
	
	/**
	 * @description Check all children items for validate methods and if method consists run it.
	 * @return {Boolean} Current form was validated?
	 */
	validate() {
		return this.dependencies.reduce((acc, dep) => {
			if (dep.validate) {
				const result = dep.validate();
				acc = acc && !!result;
			}
			return acc;
		}, true);
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
	debug?: boolean,
	name? : string,
	parent?: boolean // Don't subscribe to parent form if FALSE
	// cleanChangesAfterSave?: boolean,
}
