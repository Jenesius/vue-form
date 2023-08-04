import {CompareItem, compareDifference} from "../utils/compare-changes";
import FormEvent from "./FormEvent";

export default class CompareEvent extends FormEvent{
	constructor(comparison: CompareItem[])
	constructor(oldValue: unknown, newValue?: unknown)
	constructor(param1: object | CompareItem[], newValue?: unknown){
		super('value')

		// If first param is result of compareChanges
		if (Array.isArray(param1)) {
			this.comparison = param1;
		} else {
			this.comparison = compareDifference(param1, newValue);

		}
	}
	public comparison: CompareItem[] = []

	/**
	 * @description Статическая функция, формирующая новые compare объект(event), но фильтруя сравнения по имени.
	 * Используется для передачи только части объекта изменений в дочерний элемент.
	 * */
	static restoreByName(compareEvent: CompareEvent, name: string) {

		const array: CompareItem[] = [];

		compareEvent.comparison.forEach(item => {
			if (!item.name.startsWith(name)) return;

			array.push({
				...item,
				name: item.name.slice(name.length + 1)
			})
		})
		return new CompareEvent(array)
	}
}