import checkPrimitiveValue from "./check-primitive-value";
import concatName from "./concat-name";
import mergeObjects from "./merge-objects";
import copyObject from "./copy-object";
import checkDeepValue from "./check-deep-value";

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
 *
 * COMPARE OBJECT
 */
export function compareDifference(oldValue: unknown, newValue: unknown, name: string = ''): CompareItem[] {
	return compare(newValue, oldValue, name)
}
function step(array: CompareItem[], newValue: any, oldValue: any, name: string) {
	if (!checkDeepValue(newValue) && !checkDeepValue(oldValue)) {
		if (newValue !== oldValue)
			array.push({ name, newValue, oldValue, isEndPoint: true })
	}
	else {
		const changes = compare(newValue, oldValue, name);
		if (changes.length) {
			array.push({
				name: name,
				newValue: newValue,
				oldValue: oldValue,
				isEndPoint: false
			})
			array.push(...changes);
		}
	}
}

function compare(newValue: any, oldValue: any, name: string = ''): CompareItem[] {

	const array: CompareItem[] = [];

	if (checkDeepValue(newValue))
		for(let key in newValue as any)
			step(array, newValue?.[key], oldValue?.[key], concatName(name, key));

	// Проходим по всем полям oldValue
	// Т.к. часть полей мы уже отбросили в for...in для newValue, мы проверяем только те свойства, которых нет в новом
	// объекте. Именно по этому первым параметром в step передаётся undefined
	if (checkDeepValue(oldValue))
		for(let key in oldValue as any)
			if (!newValue?.hasOwnProperty(key))
				step(array, undefined, oldValue?.[key], concatName(name, key));

	return array;
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
export function compareMergeChanges(sourceValue: any, changes: any, name = '') {
	const newObject = mergeObjects(copyObject(sourceValue), changes);
	return compareDifference(sourceValue, newObject);

	const array: CompareItem[] = [];

	if (!checkPrimitiveValue(changes))
		for(let key in changes as any)
			step(array, changes?.[key], sourceValue?.[key], concatName(name, key));

	return array;
}

export interface CompareItem {
	name: string,
	oldValue: any,
	newValue: any,

	isEndPoint: boolean
}