import compareChanges, {CompareItem} from "../utils/compare-changes";

export default class CompareEvent {
	constructor(newValue: unknown, oldValue: unknown) {

		/**
		 * Сохраняем результат выполнения.
		 * */
		this.comparison = compareChanges(newValue, oldValue);
	}
	public comparison: CompareItem[] = []
}