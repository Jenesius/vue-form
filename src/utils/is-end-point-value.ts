import checkDeepValue from "./check-deep-value";

/**
 * @description Method using for check for value is endpoint?
 * @return {Boolean} If provided object is primitive or frozen return true, otherwise return false.
 */
export default function isEndPointValue(v: any) {
	return !checkDeepValue(v);
}