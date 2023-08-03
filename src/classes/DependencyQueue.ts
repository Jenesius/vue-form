import Form from "./Form";

/**
 * @description Класс для работы с зависимыми элементами формы. Основная задача - поддержание целостности.
 * При добавлении элемента устанавливается значение родителя, а также добавление в массив.
 * При удалении значение родителя сбрасывается.
 * */
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
	get length() {
		return this.array.length;
	}
	includes(elem: T) {
		return this.array.includes(elem)
	}
}

export interface DependencyItem {
	parent?: Form | undefined,
	name?: string,
	dispatchEvent?: any
}