import {Values} from "../types";
import generateFieldByPath from "./generate-field-by-path";
import bypassObject from "./bypass-object";

/**
 * @description Метод вернёт новый объект, заменив все примитивные значения
 * на переданный аргумент.
 * */
export default function replaceValues(object: Values, value: any = true) {

	return bypassObject(object)
	.reduce((acc: any, item) => {
		generateFieldByPath(acc, item.path, value)
		return acc;
	}, {})
}
