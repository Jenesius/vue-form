import EventEmitter from "jenesius-event-emitter";
import {inject as injectVue, provide as provideVue} from "vue";
import getPropFromObject from "../utils/get-prop-from-object";
import {FormDependence, NamedFormDependence, FunctionHandleData, Values} from "../types";
import mergeObjects from "../utils/merge-objects";
import runPromiseQueue from "../utils/run-promise-queue";
import replaceValues from "../utils/replace-values";
import getCastObject from "../utils/get-cast-object";
import grandObject from "../utils/grand-object";
import findNearestNameFromArray from "../utils/find-nearest-name-from-array";
import checkCompositeName from "../utils/check-composite-name";
import deletePropByName from "../utils/delete-prop-by-name";

export default class Form extends EventEmitter implements FormDependence{
	static PROVIDE_NAME			 = 'form-controller'; // LOCK
	static EVENT_READ			 = 'read'; // LOCK
	static EVENT_SAVE			 = 'save'; // LOCK
	static EVENT_DISABLE		 = 'disable'; // LOCK
	static EVENT_ENABLE			 = 'enable'; // LOCK
	
	static EVENT_SUBSCRIBE		 = 'subscribe'; // LOCK
	static EVENT_UNSUBSCRIBE	 = 'unsubscribe'; // LOCK
	
	static EVENT_VALUE			 = 'value';
	static EVENT_UPDATE_ABILITY  = 'ability:update';
	
	/**
	 * @description Вызывается всякий раз, когда форма была изменена. Внимание!
	 * Не установлено значение setValues, а изменена.
	 * */
	static EVENT_CHANGED		 	 = 'changed';
	static EVENT_DISABLED		 	 = 'disabled';
	
	static getParentForm(): Form | undefined {
		return injectVue(Form.PROVIDE_NAME, undefined) as Form | undefined;
	}
	/**=========**/
	
	/**
	 * @description Name of current entity.
	 */
	name?: string;
	
	/**
	 * @description Array of bound items.
	 */
	dependencies: FormDependence[] = [];
	
	/**
	 * @description Link to parent Form
	 */
	parentForm?: Form;
	
	/**
	 * @description Prettify values of Form. Modified after deepenObject
	 */
	#values: Values = {}
	
	/**
	 * @description Prettify changes of Form.
	 * Have next format: {
	 *     user: { name: true, age: true }
	 * }
	 * Mean user.name and user.age from Form.values was changed.
	 */
	#changes = {};
	
	/**
	 * @description Property for displaying warns.
	 */
	readonly #debug:boolean = false;
	
	/**
	 * @description If true - all elements by default will be blocked.
	 */
	#disabled: boolean = false;
	
	
	/**
	 * @description Function for read data (For example from DataBase)
	 * */
	#readData: FunctionHandleData = () => Promise.resolve();
	
	/**
	 * @description Function for save data (Update/Create)
	 * */
	#saveData: FunctionHandleData = () => Promise.resolve();
	
	/**
	 *	@description Getting cast of Form.values
	 */
	get changes() {
		return getCastObject(this.values, this.#changes);
	}
	get changed() {
		return !!Object.keys(this.#changes).length;
	}
	
	
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
		
		this.parentForm = injectVue(Form.PROVIDE_NAME, undefined) as Form | undefined;
		if (this.parentForm) this.parentForm.depend(this);
		
		provideVue(Form.PROVIDE_NAME, this);
	}
	
	private markChanges(values: any) {
		
		if (!values) {
			console.log(`%cUndefined values%c`, 'color:red', 'color: black', this);
			return;
		}
		
		const v = grandObject(replaceValues(values));
		mergeObjects(this.#changes, v);
		
		if (this.changed) this.emit(Form.EVENT_CHANGED, this.changed);
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
			if (!dep.name) return;
			dep.change(getPropFromObject(values, dep.name));
		})
	}
	// На данный момент не используется. Подсвечивается поскольку рекурсивная
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
	
	cleanChanges(values = {}) {
		this.#changes = grandObject(replaceValues(values));
		this.emit(Form.EVENT_CHANGED, this.changed);
	}
	change(values?: Values){
		this.setValues(values);
		
		if (values)
		this.markChanges(values);
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
		
		if (values) {
			const _v = grandObject(values);

			this.mergeValues(_v);
		}
		this.emit(Form.EVENT_VALUE, values);


		this.changeValuesOfItem(this.values)
	}
	/**
	 * @description Method using for clear field. Dont set NULL. Remove field
	 * from values.
	 * @example
	 * { address: { city: 'Some' }, name: 'jack' } clearField('address')
	 * {name: 'jack'}
	 * */
	clearField(name: string) {
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
	
	depend(item: any) {
		this.dependencies.push(item);
		this.emit(Form.EVENT_SUBSCRIBE, item);
		
		return () => this.unsubscribe(item)
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
	 * */
	getAssociatedDependencies(name: string) {
		
		function t(dep: FormDependence): dep is NamedFormDependence {
			if (dep.name === undefined) return false;
			const depName = dep.name;
			return depName.startsWith(name) || name.startsWith(depName);
		}
		
		return this.dependencies.filter(t)
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
	
	get disabled() {
		return this.#disabled;
	}
	set disabled(value: boolean){
		
		this.#disabled = value;
		this.abilities = this.getProxyAbilities();
		
		if (value)
			this.recursiveDisableItem()
		else
			this.recursiveEnableItem()
	}
	
	disable(names?: string | string[]){
		if (typeof names === "string") names = [names];
		
		this.emit(Form.EVENT_DISABLE, names);
		
		// Provided undefined -> full disable form
		if (!names) return this.disabled = true;
		
		names.forEach(name => this.disableByName(name)) ;
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
				
				
				if (value) this.recursiveEnableItem(name.toString());
				else this.recursiveDisableItem(name.toString())
				
				return true;
			},
			deleteProperty: (target: any, name: string | symbol): boolean => {
				name = name.toString();
				delete target[name];
				
				if (this.disabled) this.recursiveDisableItem(name)
				else this.recursiveEnableItem(name)
				
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
	
	
	/**VALIDATION**/
	
	validate() {
		
		return this.dependencies.reduce((acc, dep) => {
			if (dep.validate) {
				acc = acc && !!dep.validate();
			}
			
			return acc;
		}, true);
		
	}
	
}

interface FormParams {
	debug?: boolean,
	name? : string,
	// cleanChangesAfterSave?: boolean,
}
