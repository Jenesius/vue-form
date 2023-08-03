import {Values} from "../types";
import isEndPointValue from "./is-end-point-value";
/**
 * @description Сливает второй объект в первый.
 * {a: {b: 1}}, {a: {c: 1}} => {a: {b: 1 , c: 1}}
 * */
export default function mergeObjects(originalValues: Values, ...newValues: Values[]){
	function set(o: any, k: string, v: any) {
		o[k] = v;
	}

	newValues.forEach(objectValue => {
		for( const key in objectValue ) {
			const value = objectValue[key];
			if (isEndPointValue(value)) set(originalValues, key, value);
			else {
				if (!originalValues.hasOwnProperty(key)) originalValues[key] = {};

				// If current value is primitive we need to change it to object.
				if (isEndPointValue(originalValues[key])) originalValues[key] = {};

				mergeObjects(originalValues[key], value);
			}
		}
	})


	return originalValues;
}

/**
 * Принцип работы:
 *
 * merge: 1. Идём по ключам второго объекта.
 * 2. Значение простое? Да  -> Установить значение (исходныеОбъект, Значение, Текущий ключ)
 * 						Нет ->
 * 							  3. Данного ключа нет в исходному Объекте -> Установить ключ, как {}
 * 							  4. merge(исходныеОбъект[key], Значение)
 * */
