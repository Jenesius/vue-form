import checkPrimitiveValue from "./check-primitive-value";

export default function checkDeepValue(value: unknown) {
	return !checkPrimitiveValue(value) && !Array.isArray(value) && !Object.isFrozen(value);
}