export default class FormEvent {
	type: FormEventType
	payload: any

	constructor(type: FormEventType, payload: any) {
		this.type = type;
		this.payload = payload;
	}

	static newValue(values: any) {
		return new FormEvent('value', values);
	}
}



type FormEventType = 'value' | 'change' | 'available'
