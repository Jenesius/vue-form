import EventEmitter from "jenesius-event-emitter";
import {getCurrentInstance, inject as injectVue, provide as provideVue} from "vue";
import FormErrors from "./FormErrors";
import {FormDependence, FunctionHandleData, Value, Values} from "../types";

import mergeObjects from "../utils/merge-objects";
import runPromiseQueue from "../utils/run-promise-queue";
import replaceValues from "../utils/replace-values";
import getCastObject from "../utils/get-cast-object";
import grandObject from "../utils/grand-object";
import findNearestNameFromArray from "../utils/find-nearest-name-from-array";
import checkCompositeName from "../utils/check-composite-name";
import deletePropByName from "../utils/delete-prop-by-name";
import getPropFromObject from "../utils/get-prop-from-object";
import  {IComparisonResult, searchByComparison, searchChangesByComparison} from "../utils/search-changes-by-comparison";
import debug from "../debug/debug";
import checkNameInObject from "../utils/check-name-in-object";

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
	static EVENT_INPUT			 = `input`;
	/**
	 * @
	 * */
	static GET_EVENT_FIELD_INPUT(name: string) {
		return `${Form.EVENT_INPUT}:${name}`;
	}
	
	/**
	 * @description Вызывается всякий раз, когда форма была изменена. Внимание!
	 * Не установлено значение setValues, а изменена.
	 */
	static EVENT_CHANGED		 	 = 'changed';
	static EVENT_DISABLED		 	 = 'disabled';
	
	static EVENT_WAIT				 = 'wait'

	/**
	 * @description. Find the parent Form. Using for subscribe elements.
	 * Bottleneck of current library: inject, provide should state outside classes.
	 */
	static getParentForm(): Form | undefined {
		return injectVue<Form | undefined>(Form.PROVIDE_NAME, undefined);
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
	 * @description If true - all elements by default will be blocked.
	 */
	#disabled: boolean = false;
	
	/**
	 * @description True if read or save stay in status progress. After save or read will execute, value will be false
	 * */
	#wait: boolean = false;
	set wait(v: boolean) {
		this.#wait = v;
		this.emit(Form.EVENT_WAIT, this.#wait);
	}
	get wait() {
		return this.#wait;
	}

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
		if (this.parentForm && this.name) return this.parentForm.checkDependenceForChangedStatus(this.name);
		return !!Object.keys(this.#changes).length || !!this.dependencies.find(d => d.changed);
	}

	/**
	 * @description Method check name for including in changes.
	 * */
	checkDependenceForChangedStatus(dependenceName: string) {
		return checkNameInObject(this.changes, dependenceName);
	}

	/**
	 * Getter/Setter for values.
	 */
	get values() {
		return this.#values;
	}
	/**
	 * @description Notify about input event all provided changes.
	 */
	private notifyInputs(changes: IComparisonResult[]) {
		changes.forEach(changePoint => {
			this.emit(Form.GET_EVENT_FIELD_INPUT(changePoint.name), changePoint);
			this.emit(Form.EVENT_INPUT, changePoint);
		})
	}
	set values(newValues: any) {
		this.notifyInputs(searchByComparison(this.values, newValues));
		this.#values = newValues;
	}
	/**
	 * @description Method used for set values. New values don't overwrite previous, Mixing, GrandValues used for this.
	 * */
	setValues(values?: Values){

		const prettyData = grandObject(values);
		debug.msg(`New Values:`, prettyData);

		this.notifyInputs(searchChangesByComparison(this.values, prettyData));
		this.mergeValues(prettyData);

		this.emit(Form.EVENT_VALUE, prettyData); // Emit about new data.
		this.setValuesOfItem(this.values);
	}

	constructor(params: FormParams = {}) {
		super();
		
		if (params.name)
			this.name = params.name;
		debug.msg(`Creating new Form${this.name? `[${this.name}]`: ''}`);

		const currentInstance = !!getCurrentInstance()

		// If params don't include parent: false, looking for a form, in case of success subscribe current form to parent.
		if (params.parent !== false) {
			if (currentInstance)
				this.parentForm = Form.getParentForm();
			if (this.parentForm) this.parentForm.subscribe(this);
		}

		if (currentInstance)
			provideVue(Form.PROVIDE_NAME, this); // Default providing current form for children.
	}
	
	private markChanges(values: any) {
		if (!values) {
			console.warn('Provided values is undefined(null).', this);
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
	 * @description Callback triggers each time when input[name] was changed. Callback function get just one parameter:
	 * newValue.
	 * */
	oninput(callback: (state: IComparisonResult) => void): any
	oninput(name: string, callback: (newValue?: Value, oldValue?: Value) => void): any
	oninput(arg: string | ((state: IComparisonResult) => void), callback?: (newValue?: Value, oldValue?: Value) => void )
	{
		if (typeof arg === "string") {
			const fieldName = arg;
			if (!callback) throw FormErrors.CallbackIsNotProvided();
			return this.on(Form.GET_EVENT_FIELD_INPUT(fieldName), (data: IComparisonResult) => callback(data.newValue, data.oldValue))
		}

		return this.on(Form.EVENT_INPUT, (data: IComparisonResult) => arg(data))
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
		if (this.parentForm && this.name) {
			this.parentForm.change({
					[this.name]: {
						...this.values,
						...values
					}
			})
			return;
		}

		this.setValues(values);
		if (values) this.markChanges(values);

	}
	
	protected setValuesByName(name: string, value: any) {
		this.setValues({
			[name]: value
		});
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
	/**
	 * @description Clean all values, values equal {}, after that if new values was provided set them like current.
	 * */
	cleanValues(values?: Values) {
		debug.msg('Cleaning values')
		this.values = {};
		this.setValues(values || {});
	}
	
	/**
	 * @description Merging values.
	 * */
	protected mergeValues(values: Values) {
		console.log(this.values, values)
		mergeObjects(this.values, values);
	}

	/**
	 * @description subscribe is alice for depend. Subscribe element to Form.
	 * */
	subscribe(item: any) {
		debug.msg(`New subscription${'name' in item ? `(${item.name})` : ''}`)

		this.dependencies.push(item);

		// Install parentForm to this
		try {
			item.parentForm = this;
		} catch (e) {

		}

		this.emit(Form.EVENT_SUBSCRIBE, item);

		try {
			item.on(Form.EVENT_CHANGED, () => this.emit(Form.EVENT_CHANGED, this.changed));
		} catch (e) {

		}
		return () => {
			this.unsubscribe(item)
		}
	}
	/**
	 * @deprecated Use form.subscribe
	 * */
	depend(item: any) {
		return this.subscribe(item)
	}
	static proxyEvent(from: any, to: any, eventName: string) {
		if (from.on && to.emit)
			from.on(eventName, (...arg: any) => to.emit(eventName, ...arg));
	}
	unsubscribe(item: any){
		debug.msg(`Unsubscribe${'name' in item ? `(${item.name})` : ''}`)

		const index = this.dependencies.indexOf(item);
		if (index === -1) return;
		this.dependencies.splice(index, 1);
		this.emit(Form.EVENT_UNSUBSCRIBE, item);
	}

	dependInput(name: string, i: any) {
		i.name = name;
		
		return this.subscribe(i);
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
		this.emit(Form.EVENT_UPDATE_ABILITY, this.#disabled);
		this.abilities = this.getProxyAbilities();
		
		if (value)
			this.disableChildren()
		else
			this.enableChildren()
	}
	
	disable(names?: string | string[]){
		debug.msg(`Disabling ${names || ''}`);

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
		if (!name) return this.dependencies.forEach(dep => dep.disable?.())
		
		this.getAssociatedDependencies(name)
		.forEach(dep => {
			if (dep.name.startsWith(name)) return dep.disable?.(); // Точное совпадение
			dep.disable?.(name.slice(dep.name.length + 1));
		})
	}
	/**
	 * @description Method for enable all or just provided children element.
	 * */
	protected enableChildren(name?: string) {
		
		if (!name) {
			this.dependencies.forEach(dep => dep.enable?.())
			return;
		}
		
		this.getAssociatedDependencies(name)
		.forEach(dep => {
			if (!dep.enable) return;

			if (dep.name.startsWith(name)) return dep.enable(); // Точное совпадение
			dep.enable(name.slice(dep.name.length + 1));
		})
	}
	
	

	enable(names?: string | string[]) {
		debug.msg(`Enabling ${names || ''}`);
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
		debug.msg(`Reading data`);
		const array: Array<FunctionHandleData> =
			this.dependencies.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
				if (elemController.read) acc.push(elemController.read);
				return acc;
			}, []);

		array.push(() =>
			runPromiseQueue([
				() => {
					this.wait = true;
				},
				() => this.#readData?.(),
				(data: any) => this.emit(Form.EVENT_READ, data)
				]
			)
		)
		
		return () => Promise.all(array.map(c => c())).finally(() => {
			this.wait = false;
		});
	}
	set read(callback: FunctionHandleData){
		this.#readData = callback;
	}

	/**
	 * @description The same with read. After saving run cleanChanges.
	 */
	get save() {
		debug.msg(`Saving data`);
		const array: Array<FunctionHandleData> =
			this.dependencies.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
				if (elemController.save) acc.push(elemController.save);
				return acc;
			}, []);
		
		array.push(() =>
			runPromiseQueue([
				() => {
					this.wait = true
				},
				() => this.#saveData?.(),
				(data: any) => this.emit(Form.EVENT_SAVE, data),
				() => this.cleanChanges()
			])
		)
		
		return () => Promise.all(array.map(c => c())).finally(() => {
			this.wait = false;
		});
	}
	set save(callback: FunctionHandleData) {
		this.#saveData = callback;
	}
	
	/**
	 * @description Check all children items for validate methods and if method consists run it.
	 * @return {Boolean} Current form was validated?
	 */
	validate() {
		const result = this.dependencies.reduce((acc, dep) => {
			if (dep.validate) {
				const result = dep.validate();
				acc = acc && !!result;
			}
			return acc;
		}, true);

		debug.msg(`Validation ${result ? 'successful' : 'failed'}`);

		return result;
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
	name? : string,
	parent?: boolean // Don't subscribe to parent form if FALSE
	// cleanChangesAfterSave?: boolean,
}
