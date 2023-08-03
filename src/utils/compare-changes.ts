import concatName from "./concat-name";
import mergeObjects from "./merge-objects";
import copyObject from "./copy-object";
import checkDeepValue from "./check-deep-value";
import isEndPointValue from "./is-end-point-value";
import isEmptyObject from "./is-empty-object";

export interface CompareItem {
	name: string,
	oldValue: any,
	newValue: any,
	/**
	 * @description Устанавливается в true, если при обработке объекта, поле name уже не существует для newValue.
	 * Для примера, если новое значение является примитивом, а старое было: { name: "Jenesius" }, то поле name будет, по
	 * мечено, как lost, т.к. оно уже перестало существовать.
	 * */
	isLost?: boolean
}

/**
 * @description Вернёт массив: результат сравнения. Результат сравнения из себя представляет название поля, которые
 * отличаются от исходного объекта. Если поле N присутствует в newValue и присутствует в объекте oldValue и его значение
 * в этих объектах идентичное - данное поле не будет возвращено в результате работы данной функции. В любых иных случаях:
 * В новом объекте поле есть, а в старом нет (поле было добавлено) или в старом объекте поле есть, а в новом нет (поле
 * было удалено) - поле будет выведено в результате.
 *
 * @problem Что произойдёт если во вложенном объекте будет изменение? В таком случае мы всё-равно генерируем event
 * в котором уведомляем, что всё значение было изменено. Это не проблема. Если один из дочерних элементов был изменён, то
 * и родительский тоже. Дальше можно рекурсивно пройтись и узнать что именно было изменено. В худшем случае можно расширить
 * CompareItem и добавить туда difference: [], с массивом изменённых полей.
 *
 * @param {Object} newValue объект новых(исходных) значений
 * @param {Object} oldValue объект старых значений
 */
export function compareDifference(oldValue: unknown, newValue: unknown): CompareItem[] {
	return compare(newValue, oldValue)
}

/**
 *
 *
 * @param sourceValue Исходные объект
 * @param changes Изменения, которые были внесены в исходный объект.
 * @description В отличии от предыдущей функции, данная функция принимает изменения и объект, на который будут
 * производиться изменения. Из этого можно сделать вывод, что второй объект необходим лишь для двух вещей:
 * 1. Было ли поле изменено. В случае, если в изменениях пришло {name: "J"}, а в объекте и так было поле {name: "J"}, то
 * данное поле не будет помечено, как изменённое.
 * 2. Чтобы получить старое значение. (oldValue)
 * То есть мы уже имеем набор изменений, на полноценное сравнивать два объекта не надо, а лишь надо спроецировать первый
 * (изменения) на второй и сравнить, какие именно изменения будут произведены.
 *
 * Также нужно помнить, что изменения лишь проецируются на исходные значения. Иными словами, если
 * исходные значения {coordinate: {x: 1}}
 * изменения: {coordinate: {y: 2}}
 * результирующий объект(который предполагается): { coordinate: { x: 1, y: 2 } }
 * и в данном случае мы получаем, что у нас два изменения:
 * [
 *  { name: 'coordinate', newValue: { x: 1, y: 2 }, oldValue: { x: 1, y: 2 } },
 *  { name: 'coordinate.y', newValue: 2, oldValue: undefined }
 * ]
 * */
export function compareMergeChanges(sourceValue: any, changes: any) {
	const newObject = mergeObjects(copyObject(sourceValue) || {}, changes);
	return compareDifference(sourceValue, newObject);

	// Сверху установлена более простая реализация. Упрощённый вариант проецирует изменения и сравнивает объекта: исходный
	// и полученный.
}

function step(this: CompareState, newValue: any, oldValue: any, name: string): any  {
	// Если оба значения конечны.
	if (
		(isEndPointValue(newValue) || isEmptyObject(newValue)) &&
		(isEndPointValue(oldValue) || isEmptyObject(oldValue))
	){
		if (newValue !== oldValue)
			this.array.push({ name, newValue, oldValue})
	}
	else {
		const changes = compare(newValue, oldValue, name);
		
		
		if (changes.length) {
			this.array.push({ name, newValue, oldValue })
			this.array.push(...changes);
		}
	}
}
/**
 * @description Получаем все ключи для двух объектов, сохраняем их и вызываем функцию step для каждого этого ключа с
 * соответсвующим значением из newValue и oldValue.
 * */
function compare( newValue: any, oldValue: any, name: string = ''): CompareItem[] {
	const addKeys = (data: any) => checkDeepValue(data) && Object.keys(data).map(keys.add, keys)
	const state:CompareState = {
		array: []
	}
	const keys = new Set<string>();
	addKeys(newValue); addKeys(oldValue);
	
	keys.forEach(key => step.call(state, newValue?.[key], oldValue?.[key], concatName(name, key)))
	return state.array;
}

interface CompareState {
	array: CompareItem[]
}
