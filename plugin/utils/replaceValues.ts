import {Values} from "../types";
import checkPrimitiveType from "./checkPrimitiveType";

/**
 * @description Метод вернёт новый объект, заменив все примитивные значения
 * на переданный аргумент.
 * */


function replace(o: Values, value: any): {} {
	Object.keys(o)
	.forEach(key => {
		if (checkPrimitiveType(o[key])) return  o[key] = value;
		
		replace(o[key], value);
	})
	
	return o;
}

export default function replaceValues<Type>(object: Values, value: Type) {

	const copyObject = JSON.parse(JSON.stringify(object));
	
	return replace(copyObject, value);

}
