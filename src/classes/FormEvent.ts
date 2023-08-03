export default class FormEvent {
	type: FormEventType

	constructor(type: FormEventType) {
		this.type = type;
	}

}



type FormEventType = 'value' | 'change' | 'available'
