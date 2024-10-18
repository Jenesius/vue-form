export default class FormError extends Error{
	
	details: any;
	constructor(message: string, details?: any) {
		super();
		this.message = message;
		this.details = details;
	}
	static FormNotFounded() {
		return new FormError('The Form is not provided or not founded.');
	}
	static RepeatDependingWithSameName(name: string, element: any) {
		return new FormError(`The element with the name ${name} has already been subscribed to the form.`, element);
	}
	static FormWithoutName() {
		return new FormError(`For some case form should has the name.`);
	}
	static TryToGetValueWithoutName() {
		return new FormError(`Can't get value without name. Looks like form.getValueByName(). Current method has one required param.`)
	}
	static UnableExtendPrimitive(fieldKey: string) {
		return new FormError(`The field(${fieldKey}) cannot be expanded because it is a primitive`)
	}
	static ComputedValueWithoutName() {
		return new FormError(`ComputedValue cannot be execute without name.`)
	}
	static ProvidedValueNotObject(object: any) {
		return new FormError(`Provided value ${object} is not object.`);
	}
	static CallbackIsNotProvided() {
		return new FormError(`Callback is not provided to listener.`);
	}
	static DependencyNotFounded() {
		return new FormError(`Dependency was not subscribe on form or unsubscribed early.`)
	}
	static AutonomicFormWithoutParent() {
		return new FormError(`The form will always be autonomic unless a parent is specified.`)
	}
}
