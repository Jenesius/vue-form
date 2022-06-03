import {Form} from "./Form";
import {provide as provideVue} from "@vue/runtime-core";
import {inject as injectVue} from "vue";

export default class SimpleCompositeInput extends Form{
	parentForm: Form
	name: string
	constructor(a: {name: string}) {
		super(a);
		
		provideVue(Form.PROVIDE_NAME, this);
		
		this.parentForm = injectVue(Form.PROVIDE_NAME) as Form;
		this.parentForm.onInput(a.name, (v: any) => {
		
			Form.NotifyInput(this, v);
			
		})
		
		this.name = a.name;
	}
	changeByName(name: string, v: any) {
		this.parentForm.changeByName(this.name, {
			[name]: v
		});
	}
	getValueByName(name: string) {
		return this.parentForm.getValueByName(`${this.name}.${name}`)
	}
}
