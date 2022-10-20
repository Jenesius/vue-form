import Form from "./Form";
import getPropFromObject from "../utils/get-prop-from-object";
/**
 * PROXY_FORM
 * This element is used for compound elements. It does not store state in itself, but is only a proxy between the parent
 * form and the child ones. However, this form overrides some methods, making the interaction logic more isolated. In
 * the case of values, this form only refers to values that match its own name.
 *
 * For example, it is used for the address composite element, which itself consists of child elements.
 * */
export default class FormProxy extends Form{
	name: string;
	
	constructor(p:any) {
		super(p);
		
		this.name = p.name;
	}

	/**
	 * @override
	 * @description Get values just for current names from parent form.
	 */
	get values() {
		return getPropFromObject(this.parentForm?.values, this.name);
	}

	/**
	 * @description Current method join the fieldName with current proxy and ask the Parent for status of received name.
	 */
	getDisabledByName(fieldName: string):boolean {
		return Boolean(this.parentForm?.getDisabledByName(`${this.name}.${fieldName}`));
	}

	/**
	 * @override
	 * @description Т.к. данный объект является чисто проксирующим объектом, про
	 * исходит вызов метода на изменение в родительской форме.
	 * */
	input(name: string, v: any) {
		const value = {[name]: v};
		
		// this.parentForm?.input(this.name, value)
		this.parentForm?.input(this.name, {
			...this.values,
			...value
		})
	}
}

