import {reactive} from "vue";
import { ValidationRule} from "../types";
import EventEmitter from "jenesius-event-emitter";
import {FormOld} from "./Form";

export class Input extends EventEmitter{
	static EVENT_NEW_VALUE = 'input:new-value';
	static EVENT_CHANGE_DISABLED = 'input:change-disabled';
	
	name: string

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
		this.emit(Input.EVENT_CHANGE_DISABLED, v);
	}
	
	setValue(v: any) {
		this.emit(Input.EVENT_NEW_VALUE, v);
	}
	
	hide() {
	
	}
	show() {
	
	}
	
	change(v: any) {
		this.emit(FormOld.EVENT_CHANGE, v);
		this.setValue(v);
	}
	/**
	 * @deprecated
	 * */
	setChange(v: any) {
		/**
		 * Эмитим на верх о том, что мы были изменены.
		 * Однако эта функция вызывается для любого установления значения
		 * @deprecated
		 * */
		this.emit(FormOld.EVENT_CHANGE, v);
		
		this.setValue(v);
	}

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
