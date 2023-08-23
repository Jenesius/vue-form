import {Values} from "../types";
import bypassObject from "./bypass-object";
import insertByName from "./insert-by-name";

/**
 * @description Метод вернёт новый объект, заменив все примитивные значения.
 * на переданный аргумент.
 *
 * @warning Не заменит объект на объект, а поменяет все !isIterablePoint на переданное значение.
 * */
export default function replaceValues(object: Values, value: any = true) {

	return bypassObject(object)
	.reduce((acc: any, item) => {
		insertByName(acc, item.name, value);
		return acc;
	}, {})
}
