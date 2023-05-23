import {CompareItem, compareDifference} from "../utils/compare-changes";
import FormEvent from "./FormEvent";

export default class CompareEvent extends FormEvent{
	constructor(comparison: CompareItem[])
	constructor(newValue: unknown, oldValue?: unknown)
	constructor(param1: object | CompareItem[], oldValue?: unknown){
		super('value')

		// If first param is result of compareChanges
		if (Array.isArray(param1)) {
			this.comparison = param1;
		} else {
			this.comparison = compareDifference(param1, oldValue);

		}
	}
	public comparison: CompareItem[] = []

	/**
	 * @description Статическая функция, формирующая новые compare объект(event), но фильтруя сравнения по имени.
	 * Используется для передачи только части объекта изменений в дочерний элемент.
	 * */
	static restoreByName(compareEvent: CompareEvent, name: string) {
		return new CompareEvent(
			compareEvent.comparison
			.filter(comp => comp.name.startsWith(name))
			.map(comp => {
				comp.name = comp.name.slice(name.length + 1);
				return comp;
			}) // Удаляем приставку + 1(символ '.')
		)
	}
}