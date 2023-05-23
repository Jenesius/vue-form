import Form from "./Form";

export default class DependencyQueue<T extends DependencyItem> {
	private array: DependencyItem[] = []
	private readonly form: Form

	constructor(form: Form) {
		this.form = form;
	}

	add(object: T) {
		const parentForm = this.form;

		if (!object.name) throw new Error(`Can't add dependency without name.`);

		object.parent = parentForm
		this.array.push(object);



		parentForm.oninput(object.name, (event: any) => {
			object.notify('value', event)
		})
	}
	remove(object: T) {
		console.log('Псевдо удаление ')
	}

}

export interface DependencyItem {
	parent?: Form | undefined,
	name?: string,
	notify: any
}