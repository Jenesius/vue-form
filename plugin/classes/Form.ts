import {
	computed,
	ComputedRef,
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

export class Form extends EventEmitter{
	
	static PROVIDE_NAME = 'form-controller';
	static EVENT_CHANGE_NAME = 'change';
	static EVENT_DISABLED_UPDATE = 'update-disabled'
	
	name?: string;
	
	/**
	 * @description ComputedRef, true - when one of form's elements is changed.
	 * */
	changed: ComputedRef<boolean> = computed(() => true);
	
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
	depend(element: any) {
		
		// Если элемент с таким именем уже был подписан на форму
		if (
			element.name &&
			this.dependElements.find(depend => depend.name === element.name)
		) throw FormErrors.RepeatDependingWithSameName(element.name, element);
		
		this.dependElements.push(markRaw(element));
		
		if (element.name) {
			const value = getPropFromObject(this.values, element.name);
			
			
			// Нового значения у нас не найдено.
			if (value === undefined) return;
			
			this.setValueItem(element, value);
		}

		/**
		 * Подписываемся на изменение элемента
		 * */
		
		/*
		Проверка на eventEmitter
		
		element.on(Form.EVENT_CHANGE_NAME, () => {
			this.changes[element.name] = true;
		})
		this.changed = computed(() => {
			return (
				Object.keys(this.changes).length ||
				this.dependElements.find(elem => elem.changed.value === true)
			)
		})
			
		 */
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
	setValues(values: Values){
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
		
	}
	
	getValues() {
		
		const output: {[name: string]: any} = mergeObjects({}, this.values);
		
		this.dependElements.forEach(elem => {
			
			if (elem.getValue) output[elem.name] = elem.getValue();
			if (elem.getValues) output[elem.name] = elem.getValues();
		})
		
		return output;
		
	}
	
	disabled: boolean = false;
	/**
	 * @description Блокировка элементов формы
	 * */
	disable() {
		this.setDisabled(true);
	}
	enable() {
		this.setDisabled(false);
	}
	private setDisabled(v:boolean) {
		this.disabled = v;
		
		v?this.disableDepends():this.enableDepends();
		
		this.emit(Form.EVENT_DISABLED_UPDATE, v);
	}
	private disableDepends() {
		this.dependElements.forEach(elem => {
			if (elem.disabled) return; // Depend already stay in status "Disabled"
			
			elem.disable?.();
			
		})
	}
	private enableDepends() {
		this.dependElements.forEach(elem => {
			if (!elem.disabled) return;
			elem.enable?.();
		})
	}
	
	setChanges(values: Values) {}
	getChanges() {}
	
	
	restoreDependence(name: string) {
		
		const dep = this.findDependence(name);
		if (!dep) return undefined;
		
		if (dep.reinitialization)
			dep.reinitialization();
		
		return dep;
	}
}

export interface FormParams {
	name?: string,
	composition?: boolean
}

