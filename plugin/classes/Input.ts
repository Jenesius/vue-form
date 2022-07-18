import EventEmitter from "jenesius-event-emitter";
import Form from "./Form";

export default class Input extends EventEmitter {

	parentForm?: Form;
	name: string;
	validation: any[] = []
	
	constructor(params: InputParams) {
		super();
		
		this.name = params.name;
		this.parentForm = Form.getParentForm();
		if (params.validation) this.validation = params.validation;
	}
	
	get value() {
		if (!this.name) return '';
		return this.parentForm?.getValueByName(this.name);
	}
	set value(v) {
		if (!this.name) return;
		this.parentForm?.setValues({
			[this.name]: v
		})
	}
	get disabled() {
		return this.parentForm?.getDisabledByName(this.name) || false;
	}
	
	change(v: any) {
		if (!this.name) return;
		this.parentForm?.input(this.name, v);
	}

	/**
	 * @description Run all guards from validation. Input is not validated If on
	 * e of guard don't return true.
	 * @return Array {} Array of string messages.
	 *
	 * */
	validate(): string[] {
		return this.validation.reduce((acc, guard) => {
			
			const guardResult = guard(this.value);
			if (guardResult !== true) acc.push(guardResult);
			
			return acc;
		}, []);
	}
	
}
interface InputParams {
	name: string,
	validation?: any[]
}
