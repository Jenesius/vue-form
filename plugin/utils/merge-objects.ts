import {Values} from "../types";
import checkPrimitiveType from "./check-primitive-type";
/**
 * @description Мержит два объекта, полностью не перезаписываю значения.
 * {a: {b: 1}}, {a: {c: 1}} => {a: {b: 1 , c: 1}}
 * */
export default function mergeObjects(formValues: Values, newValues: Values, path: string[] = []){
	
	function set(formValues: Values, v: Values, path: string[]) {
		if (path.length === 0) {
			console.warn('Path length === 0');
			return;
			
		}

		const currentKey = path[0];

		if (path.length === 1) {
			formValues[currentKey] = v;
			return ;
		}

		if (formValues[currentKey] === undefined || formValues[currentKey] === null)
			formValues[currentKey] = {};

		const currentValue = formValues[currentKey];

		if (typeof currentValue !== 'object') {
			console.warn('Текущее значение не является объектом, продолжать рекурсивный спуск по объеут нельзя.')
			return ;
		}

		set(currentValue as Values, v, path.slice(1));

		return formValues;
	}

	if (checkPrimitiveType(newValues)) set(formValues, newValues, path);
	else {
		for(const key in newValues) {
			
			mergeObjects(formValues, newValues[key], [...path, key]);
		}
	}

	return formValues;
}
