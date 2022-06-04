import Form from "./Form";
import getPropFromObject from "../utils/getPropFromObject";


export default class FormProxy extends Form{

	get values() {
		return getPropFromObject(this.parentForm?.values, this.name);
	}
	get disabledElements(){
		return this.parentForm?.disabledElements.filter(name => name.startsWith(this.name))
		// @ts-ignore
		.map(name => name.slice(this.name.length + 1)) || []
	}
	/**
	 * @override
	 * @description Т.к. данный объект является чисто проксирующим объектом, про
	 * исходит вызов метода на изменение в родительской форме.
	 * */
	input(name: string, v: any) {
		const value = {[name]: v};
		
		this.parentForm?.input(this.name, value)
	}
}
