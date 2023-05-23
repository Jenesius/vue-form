import Form from "./Form";

export default class DependencyQueue<T extends DependencyItem> {
	private array: T[] = []
	private readonly form: Form

	constructor(form: Form) {
		this.form = form;
	}

	add(object: T) {
		const parentForm = this.form;

		if (!object.name) throw new Error(`Can't add dependency without name.`);

		object.parent = parentForm
		this.array.push(object);

	}
	remove(object: T) {
		console.log('Псевдо удаление ')
	}

	forEach(callback: (elem: T) => void) {
		this.array.forEach(callback);
	}
}

export interface DependencyItem {
	parent?: Form | undefined,
	name?: string,
	notify: any,
	dispatchEvent?: any
}