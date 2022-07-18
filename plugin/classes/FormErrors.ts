export default class FormErrors extends Error{
	
	details: any;
	constructor(message: string, details?: any) {
		super();
		this.message = message;
		this.details = details;
	}
	
	static RepeatDependingWithSameName(name: string, element: any) {
		return new FormErrors(`The element with the name ${name} has already been subscribed to the form.`, element);
	}
	static ProxyFormWithoutName() {
		return new FormErrors(`Can't create FormProxy without name.`);
	}
	static TryToGetValueWithoutName() {
		return new FormErrors(`Can't get value without name. Looks like form.getValueByName(). Current method has one required param.`)
	}
	static MergingObjectGotPrimitiveValue() {
	
	}
}
