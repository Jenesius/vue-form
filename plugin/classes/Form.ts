import {
	reactive,
	markRaw,
	provide as provideVue,
	inject as injectVue
} from "vue";
import mergeObjects from "../utils/mergeObjects";
import {Values} from "../types";
import getPropFromObject from "../utils/getPropFromObject";
import FormErrors from "./FormErrors";
import EventEmitter from "jenesius-event-emitter";
import {runPromiseQueue} from "../utils/run-promise-queue";

export class Form extends EventEmitter{
	
	static PROVIDE_NAME			 = 'form-controller';
	static EVENT_CHANGE	 = 'change';
	static EVENT_DISABLED_UPDATE = 'update-disabled';
	static EVENT_HIDE_UPDATE	 = 'update-hidden-fields';
	static EVENT_DEPEND			 = 'on-depend';
	static EVENT_READ			 = 'read';
	static EVENT_SAVE			 = 'save';
	
	static getParentForm(): Form {
		return injectVue(Form.PROVIDE_NAME) as Form;
	}
	
	/**
	 * Version of current form. Can be used for check the current data of form.
	 * */
	version: number | undefined = undefined;
	
	name?: string;
	
	/**
	 * @description ComputedRef, true - when one of form's elements is changed.
	 * */
	changed = false;
	
	/**
	 * @description Store all depend elements.
	 * */
	dependElements: any[] = reactive([]);
	
	constructor(params: FormParams) {
		super();
		
		if (params.name) this.name = params.name;
		
		if (params.composition) {
			const parentForm = injectVue(Form.PROVIDE_NAME) as Form;
			parentForm.depend(this);
		}
		
		// Connection plugins to form.
		if (params.plugins) {
			params.plugins.forEach(p => p(this));
		}
		
		this.on(Form.EVENT_CHANGE, (...arr) => {
			console.log(arr)
		})
		
		this.reinitialization();
	}
	
	reinitialization() {
		provideVue(Form.PROVIDE_NAME, this);
	}
	
	values: Values = {};
	
	findDependence(name: string) {
		return this.dependElements.find(element => element.name === name);
	}
	
	/**
	 * @description Подписывает элемент на форму
	 * */
	changes:{[name: string]: boolean} =  {}
	depend(element: any) {
		
		// Если элемент с таким именем уже был подписан на форму
		if (
			element.name &&
			this.dependElements.find(depend => depend.name === element.name)
		) throw FormErrors.RepeatDependingWithSameName(element.name, element);
		
		this.dependElements.push(markRaw(element));
		
		this.emit(Form.EVENT_DEPEND, element);
		
		if (element.name) {
			const value = getPropFromObject(this.values, element.name);
			
			
			// Нового значения у нас не найдено.
			if (value !== undefined) this.setValueItem(element, value);
			
			
		}


		
		/**
		 * Подписываемся на изменение элемента
		 * */
		element.on(Form.EVENT_CHANGE, () => {
			this.changes[element.name] = true;
			this.changed = true;
			this.emit(Form.EVENT_CHANGE)
		})

	}
	restoreDependence(name: string) {
		
		const dep = this.findDependence(name);
		if (!dep) return undefined;
		
		if (dep.reinitialization)
			dep.reinitialization();
		
		return dep;
	}
	/**
	 * Функция проходит по всем зависимым элементам и проверяет правила валидации
	 * у каждого
	 *
	 * @return {boolean} isValidate. False - if one of the dependence element
	 * is not validate.
	 * */
	validate(): boolean {
		return this.dependElements.reduce((acc, elem) => {
			if (elem.validate) acc = elem.validate() && acc;
			
			return acc;
		}, true);
	}
	
	private setValueItem(elementController: any, values: Values) {
		
		if (elementController.setValue) {
			elementController.setValue(values)
			return;
		}
		
		//INPUT FORM
		if (elementController.setValues && typeof values === 'object' && values !== null) {
			elementController.setValues(values);
			return;
		}
		
	}
	setValues(values: Values, options: ISetValuesOptions = {}){
		mergeObjects(this.values, values);
		
		this.dependElements.forEach(controller => {
			
			const name = controller.name; // name of fields or form
			if (name) {
				const value = getPropFromObject(values, name);
				
				
				// Нового значения у нас не найдено.
				if (value === undefined) return;
				
				this.setValueItem(controller, value);
			}
			
		})
		
		function dtoOptions(options: ISetValuesOptions): ISetValuesOptions {
			
			if (!("change" in options)) options.change = true;
			
			return options;
			
		}
		options = dtoOptions(options);
		if (options.change) this.setChange(true)
		
	}
	
	getValues() {
		
		const output: {[name: string]: any} = mergeObjects({}, this.values);
		
		this.dependElements.forEach(elem => {
			
			if (elem.getValue) output[elem.name] = elem.getValue();
			if (elem.getValues) output[elem.name] = elem.getValues();
		})
		
		return output;
		
	}
	
	/**
	 * @description Получение значения по имени элемента
	 * */
	getValueByName(name: string) {
		return getPropFromObject(this.values, name);
	}
	
	getChanges() {
		
		const output =Object.keys(this.changes).reduce((acc: any, name) => {
			
			const d = this.findDependence(name);
			
			// Класс для работы со значением не найден.
			if (!d) acc[name] = this.values[name];
			
			if (d && "getChanges" in d) acc[name] = d.getChanges();
			
			if (d) acc[name] = d.getValue?d.getValue():d.getValues();
			
			return acc;
		}, {})
		
		return output;
		
	}
	
	disabled: boolean = false;
	/**
	 * @description Блокировка элементов формы
	 * */
	disable(names?: string[] | string) {
		if (!names) {
			this.setDisabled(true);
			return;
		}
		
		if (typeof names === "string") names = [names];
		this.disableDepends(names);
		
	}
	enable(names?: string[] | string) {
		if (!names) {
			this.setDisabled(false);
			return;
		}
		if (typeof names === "string") names = [names];
		this.enableDepends(names);
		
	}
	private setDisabled(v:boolean) {
		this.disabled = v;
		
		v?this.disableDepends():this.enableDepends();
		
		this.emit(Form.EVENT_DISABLED_UPDATE, v);
	}
	private disableDepends(names?: string[]) {
		this.dependElements.filter(v => {
			if (!names) return true;
			if (names.includes(v.name)) return true;
			return false;
		}).forEach(elem => {
			if (elem.disabled) return; // Depend already stay in status "Disabled"
			elem.disable?.();
		})
	}
	private enableDepends(names?: string[]) {
		this.dependElements.filter(v => !names || names.includes(v.name)).forEach(elem => {
			if (!elem.disabled) return;
			elem.enable?.();
		})
	}
	


	
	setChange(v: boolean) {

		this.changed = v;
		this.emit(Form.EVENT_CHANGE, v);
	}
	/**
	 * @description Method cleans all names that was changed
	 * */
	cleanChanges() {
		this.changes = {}
	}
	
	
	/**
	 * Methods and props for hide/show fields
	 * */
	hidden: boolean = false;
	hiddenFields = reactive<string[]>([]);
	
	hideFields (names: string | string[]) {
		if (typeof names === "string") names = [names];
		
		this.setHiddenFields([...this.hiddenFields, ...names]);

	}

	showFields (names?: string | string[]) {
		
		if (!names) return this.setHiddenFields([])
		
		const newArray: string[] = [];
		this.hiddenFields.forEach(name => {
			if (names.includes(name)) return;
			newArray.push(name);
		})
		
		this.setHiddenFields(newArray)
	}
	isHidden(name: string) {
		return this.hiddenFields.includes(name);
	}
	
	hide() {
		this.setHidden(true);
	}
	show() {
		this.setHidden(false);
	}
	setHidden(v: boolean) {
		this.hidden = v;
		this.emit(Form.EVENT_HIDE_UPDATE, v);
	}
	/**
	 * @description Function get new array of hidden fields. All fields, that now
	 * don't stay in status "hidden" will be showed. Other fields will be hidden.
	 * */
	private setHiddenFields(names: string[]) {
		
		// Скрываем новые
		names.forEach(name => {
			const d = this.findDependence(name);
			if (!d) return;
			
			// Если он уже содержит этот инпут
			if (this.hiddenFields.includes(name)) return;
			
			d.hide?.();
		})
		
		// Если в скрытых поля присутсвует поле, которые нужно расскрыть
		this.hiddenFields.forEach(name => {
			const d = this.findDependence(name);
			if (!d) return;
			
			// Если новая пачка имён попрежнему содержит поле - пропускаем
			if (names.includes(name)) return;
			
			d.show?.();
		})
		
		this.hiddenFields.splice(0, this.hiddenFields.length);
		this.hiddenFields.push(...names);
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
			this.dependElements.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
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
			this.dependElements.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
				if (elemController.save) acc.push(elemController.save);
				return acc;
			}, []);
		
		array.push(() =>
			runPromiseQueue([
				() => this.saveData?.(),
				(data: any) => this.emit(Form.EVENT_SAVE, data),
				() => this.cleanChanges()
			])
		)
		
		return () => Promise.all(array.map(c => c()));
	}
	set save(callback: FunctionHandleData) {
		this.saveData = callback;
	}
	
	
	
	
	
	
	onInput(name: string, callback: any) {
		return this.on(`input:${name}`, callback);
	}
	changeByName(name: string, value: any) {
		this.emit(`input:${name}`, value);
		mergeObjects(this.values, {
			[name]: value
		});
	}

	
	
	
	
	
}


type FunctionHandleData = () => Promise<any> | any | void
export interface FormParams {
	name?: string,
	composition?: boolean,
	plugins?: any[]
}
export interface ISetValuesOptions {
	change?: boolean
}

