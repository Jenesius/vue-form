import {markRaw, reactive, ref} from "vue";
import { ValidationRule} from "../types";

export function Input(params: InputParams): InputInterface {
	
	const obj = reactive<InputInterface>({
		value: undefined,
		name : params.name,
		disabled: false,
		hidden: false,
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


export interface InputParams {
	name: string,
	validation?: ValidationRule[]
}

export interface InputInterface{
	name: string,
	value: any,
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
}
