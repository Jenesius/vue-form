import compareChanges, {CompareItem} from "../utils/compare-changes";

export default class CompareEvent {
	constructor(comparison: CompareItem[])
	constructor(newValue: unknown, oldValue?: unknown)
	constructor(param1: object | CompareItem[], oldValue?: unknown){

		// If first param is result of compareChanges
		if (Array.isArray(param1)) {
			this.comparison = param1;
		} else {
			this.comparison = compareChanges(param1, oldValue);
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