import Form from "./Form";
import FormError from "./FormError";

/**
 * @description Класс для работы с зависимыми элементами формы. Основная задача - поддержание целостности.
 * При добавлении элемента устанавливается значение родителя, а также добавление в массив.
 * При удалении значение родителя сбрасывается.
 * */
export default class DependencyQueue<T extends (DependencyItem & Record<string, any>)> {
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
		if (!this.array.includes(object)) throw FormError.DependencyNotFounded();
		
		object.parent = undefined;
		
		this.array.splice(
			this.array.indexOf(object), 1
		)
	}
	find(expression: (elem: T, index: number) => boolean) {
		return this.array.find(expression);
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
	reduce<U>(callback: (acc: U, elem: T) => U, defaultAcc: U) {
		return this.array.reduce(callback, defaultAcc)
	}
}

export interface DependencyItem {
	parent?: Form | undefined,
	name?: string,
	dispatchEvent?: any
}