import checkPrimitiveType from "./check-primitive-type";

/**
 * @description Method using for check for value is endpoint?
 * @return {Boolean} If provided object is primitive or frozen return true, otherwise return false.
 */
export default function isEndPointValue(v: any) {

	if (checkPrimitiveType(v)) return true;

	/**
	 * If value of frozen, For example, in case passing File or some Class Data.
	 */
	if (
		Object.isFrozen(v)
	) return true;

	return false;
}