import {reactive} from "vue";
import { ValidationRule} from "../types";
import EventEmitter from "jenesius-event-emitter";
import {Form} from "./Form";

export class Input extends EventEmitter{
	static EVENT_NEW_VALUE = 'input:new-value';
	static EVENT_CHANGE_DISABLED = 'input:change-disabled';
	
	// Значение инпута
	value: any
	//
	name: string
	
	disabled:boolean = false
	hidden:boolean = false
	validation: InputParams["validation"] = []
	constructor(params: InputParams) {
		super();
		
		this.name = params.name;
		this.validation = params.validation;
	}
	
	disable() {
		this.setDisabled(true);
	}
	enable() {
		this.setDisabled(false);
	}
	
	private setDisabled(v: boolean) {
		if (v === this.disabled) return;
		
		this.disabled = v;
		this.emit(Input.EVENT_CHANGE_DISABLED, v);
	}
	
	setValue(v: any) {
		//console.log(`Input %c${this.name} %cset value %c${v}`, 'color: green', 'color: black', 'color: red')
		
		this.value = v;
		this.emit(Input.EVENT_NEW_VALUE, v);
	}
	hide() {
		this.hidden = true;
	}
	show() {
		this.hidden = false;
	}
	setChange(v: any) {
		/**
		 * Эмитим на верх о том, что мы были изменены.
		 * Однако эта функция вызывается для любого установления значения
		 * */
		this.emit(Form.EVENT_CHANGE, v);
		
		this.setValue(v);
	}

	getValue() {
		return this.value;
	}
	errors: any[] = []
	validate() {
		if (!this.validation) return true;
		
		const newErrors: string[] = [];
		
		this.validation.forEach(rule => {
			const ruleResult = rule(this.value);
			
			if (ruleResult === true) return;
			
			newErrors.push(String(ruleResult));
		})
	
		this.errors.splice(0, this.errors.length, ...newErrors);
		
		return this.errors.length === 0;
	}
}

export function Input1(params: InputParams): InputInterface {
	
	const obj = reactive<InputInterface>({
		value: undefined,
		name : params.name,
		disabled: false,
		hidden: false,
		changed: false,
		disable: function () {
			this.disabled = true;
		},
		enable: function () {
			this.disabled = false;
		},
		setValue: function (v: any) {
			//console.log(`Input %c${this.name} %cset value %c${v}`, 'color: green', 'color: black', 'color: red')
			
			this.value = v;
		},
		hide() {
			this.hidden = true;
		},
		show() {
			this.hidden = false;
		},
		setChange: function (v: any) {
			/**
			 * Эмитим на верх о том, что мы были изменены.
			 * Однако эта функция вызывается для любого установления значения
			 * */
			//this.emit('change', v);
			
			this.setValue(v);
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

export function useInputState(input: Input) {
	
	const state = reactive({
		value: input.value,
		disabled: input.disabled
	})
	
	input.on(Input.EVENT_NEW_VALUE, v => state.value = v);
	input.on(Input.EVENT_CHANGE_DISABLED, v => state.disabled = v);
	
	return state;
}

export interface InputParams {
	name: string,
	validation?: ValidationRule[]
}

export interface InputInterface{
	name: string,
	value: any,
	changed: boolean,
	setValue: (v: any) => void,
	setChange: InputInterface["setValue"],
	getValue: () => any,
	validate: () => boolean,
	errors: string[],
	disabled: boolean,
	disable: () => void,
	enable: () => void,
	hidden: boolean,
	hide: () => void,
	show: () => void,
	type?: string
}
