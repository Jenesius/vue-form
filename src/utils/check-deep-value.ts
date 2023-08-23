import checkPrimitiveValue from "./check-primitive-value";

/**
 * @description Вернёт true если возможно перебрать значение вглубь.
 * */
export default function checkDeepValue(value: unknown) {
	return !(
		checkPrimitiveValue(value) ||
		Array.isArray(value) ||
		Object.isFrozen(value)
	) ;
}