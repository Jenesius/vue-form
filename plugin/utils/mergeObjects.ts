import {Values} from "../types/index";
/**
 * @description Мержит два объекта, полностью не перезаписываю значения.
 * {a: {b: 1}}, {a: {c: 1}} => {a: {b: 1 , c: 1}}
 * */
export default function mergeObjects(formValues: Values, newValues: Values, path: string[] = []){

	function set(formValues: Values, v: Values, path: string[]) {
		if (path.length === 0) return console.warn('Path length === 0');

		const currentKey = path[0];

		if (path.length === 1) {
			formValues[currentKey] = v;
			return ;
		}

		if (formValues[currentKey] === undefined || formValues[currentKey] === null)
			formValues[currentKey] = {};

		const currentValue = formValues[currentKey];

		if (typeof currentValue !== 'object') return console.warn('Текущее значение не является объектом, продолжать рекурсивный спуск по объеут нельзя.')

		set(currentValue as Values, v, path.slice(1));

	}

	if (typeof newValues !== 'object') return set(formValues, newValues, path);

	for(const key in newValues) {

		mergeObjects(formValues, newValues[key], [...path, key]);
	}

	return formValues;
}
