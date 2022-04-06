import EventEmitter from "./EventEmitter";
import {markRaw, reactive, ref} from "vue";
import { ValidationRule} from "../types";

export function Input(params: InputParams): InputInterface {
	
	const obj = reactive<InputInterface>({
		value: undefined,
		name : params.name,
		setValue: function (v: any) {
			console.log(`Input %c${this.name} %cset value %c${v}`, 'color: green', 'color: black', 'color: red')
			
			this.value = v;
		},
		getValue: function () {
			return this.value;
		},
		errors: [],
		
		
		/**
		 * @description Валидирует инпут. Проходит все правила в массиве validation.
		 * Если результат функции не равен true, добавляет её в массив errors.
		 * Если по завершению массив errors не пуст, вернёт false, иначе true.
		 * Массив Errors очищает перед проверкой.
		 * */
		validate: function () {
			if (!params.validation) return true;
			
			const newErrors: string[] = [];
			
			params.validation.forEach(rule => {
				const ruleResult = rule(this.value);
				
				if (ruleResult === true) return;
				
				newErrors.push(String(ruleResult));
			})
			
			this.errors.splice(0, this.errors.length, ...newErrors);
			
			return this.errors.length === 0;
		}
	})
	

	

	return obj;
}

export class Input1 extends EventEmitter{
	
	state = reactive<{
		value: any
	}>({
		value: undefined
	})
	
	value = ref();
	changes: any;
	
	name: string;
	
	constructor(params: InputParams) {
		super();
		this.name = params.name;
	}
	
	setValue(v: any) {
		
		console.log(`Input %c${this.name} %cset value %c${v}`, 'color: green', 'color: black', 'color: red')
		
		this.state.value = v;
		
		//this.emit('input', this.state.value);
	}
	getValue(){
		return this.state.value;
	}
}

export interface InputParams {
	name: string,
	validation?: ValidationRule[]
}

export interface InputInterface{
	name: string,
	value: any,
	setValue: (v: any) => void,
	getValue: () => any,
	validate: () => boolean,
	errors: string[],
}
