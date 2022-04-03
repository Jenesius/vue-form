import {computed, ComputedRef, reactive, markRaw, provide as provideVue} from "vue";
import mergeObjects from "../utils/mergeObjects";
import {Values} from "../types";
import EventEmitter from "./EventEmitter";
import getPropFromObject from "../utils/getPropFromObject";

export class Form extends EventEmitter{
	
	static PROVIDE_NAME = 'form-controller';
	
	/**
	 * @description ComputedRef, true - when one of form's elements is changed.
	 * */
	changed: ComputedRef<boolean> = computed(() => true);
	
	/**
	 * @description Store all depend elements.
	 * */
	dependElements: any[] = reactive([]);
	
	constructor(props: FormParams) {
		super();
		provideVue(Form.PROVIDE_NAME, this);
	}
	
	values: Values = {};
	
	findDepend(name: string) {
		return this.dependElements.find(element => element.name === name);
	}
	depend(element: any) {
		this.dependElements.push(markRaw(element));
		
		if (element.name) {
			const value = getPropFromObject(this.values, element.name);
			
			
			// Нового значения у нас не найдено.
			if (value === undefined) return;
			
			this.setValueItem(element, value);
		}

		
	}
	setValueItem(elementController: any, values: Values) {
		
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
		
		const output: {[name: string]: any} = {};
		
		this.dependElements.forEach(elem => {
			output[elem.name] = elem.getValue();
		})
		
		return mergeObjects(output, this.values);
		
	}
}

export interface FormParams {

}

