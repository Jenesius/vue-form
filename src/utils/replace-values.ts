import {Values} from "../types";
import isEndPointValue from "./is-end-point-value";
import iterateEndpoint from "./iterate-endpoint";
import generateFieldByPath from "./generate-field-by-path";

/**
 * @description Метод вернёт новый объект, заменив все примитивные значения
 * на переданный аргумент.
 * */

function replace(o: Values, value: any): {} {
	Object.keys(o)
	.forEach(key => {
		if (isEndPointValue(o[key])) return  o[key] = value;
		
		replace(o[key], value);
	})
	
	return o;
}

export default function replaceValues(object: Values, value: any = true) {

	return iterateEndpoint(object)
	.reduce((acc: any, item) => {
		generateFieldByPath(acc, item.path, value)
		return acc;
	}, {})

	/*
	const copyObject = JSON.parse(JSON.stringify(object));
	
	return replace(copyObject, value);*/

}