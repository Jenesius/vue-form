import {FormOld} from "./Form";
import {provide as provideVue} from "@vue/runtime-core";
import {inject as injectVue} from "vue";

export default class SimpleCompositeInput extends FormOld{
	parentForm: FormOld
	name: string
	constructor(a: {name: string}) {
		super(a);
		
		provideVue(FormOld.PROVIDE_NAME, this);
		
		this.parentForm = injectVue(FormOld.PROVIDE_NAME) as FormOld;
		this.parentForm.onInput(a.name, (v: any) => {
			this.notifyInput(v);
		})
		this.name = a.name;
		
		setTimeout(() => {
			this.parentForm.dependInput(this.name, this);
			
		}, 10);
		
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
