import checkPrimitiveValue from "./check-primitive-value";

/**
 * @description Method using for check for value is endpoint?
 * @return {Boolean} If provided object is primitive or frozen return true, otherwise return false.
 */
export default function isEndPointValue(value: any) {
	return (
		checkPrimitiveValue(value) ||
		Array.isArray(value) ||
		Object.isFrozen(value)
	);
}