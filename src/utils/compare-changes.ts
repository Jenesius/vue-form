import checkPrimitiveValue from "./check-primitive-value";
import concatName from "./concat-name";

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
export default function compareChanges(newValue: unknown, oldValue: unknown): CompareItem[] {
	return compare(newValue, oldValue)
}
function compare(newValue: any, oldValue: any, name: string = ''): CompareItem[] {
	function step(newValue: any, oldValue: any, name: string) {
		if (checkPrimitiveValue(newValue) && checkPrimitiveValue(oldValue)) {
			if (newValue !== oldValue)
				array.push({ name, newValue, oldValue })
		}
		else {
			const changes = compare(newValue, oldValue, name);
			if (changes.length) {
				array.push({
					name: name,
					newValue: newValue,
					oldValue: oldValue
				})
				array.push(...changes);
			}
		}
	}

	const array: CompareItem[] = [];

	if (!checkPrimitiveValue(newValue))
		for(let key in newValue as any)
			step(newValue?.[key], oldValue?.[key], concatName(name, key));

	// Проходим по всем полям oldValue
	// Т.к. часть полей мы уже отбросили в for...in для newValue, мы проверяем только те свойства, которых нет в новом
	// объекте. Именно по этому первым параметром в step передаётся undefined
	if (!checkPrimitiveValue(oldValue))
		for(let key in oldValue as any)
			if (!newValue?.hasOwnProperty(key))
				step(undefined, oldValue?.[key], concatName(name, key));

	return array;
}

export interface CompareItem {
	name: string,
	oldValue: any,
	newValue: any
}