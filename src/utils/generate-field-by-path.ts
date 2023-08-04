import isEndPointValue from "./is-end-point-value";
import FormError from "../classes/FormError";
/**
 * @description By provided path and value create props of provided object
 * @example {}, ["address", "city"], Berlin -> { address: city: "Berlin" }
 * */
export default function generateFieldByPath(object: any, path: string[], value: any) {
	const refObject = object;
	path.forEach((key,index) => {

		if (index >= path.length - 1) return Object.defineProperty(object, key, {
			value,
			enumerable: true,
			configurable: true
		});
		if (!Object.prototype.hasOwnProperty.call(object, key)) {
			object[key] = {}
			object = object[key];
			return;
		}
		if (isEndPointValue(object[key])) throw FormError.UnableExtendPrimitive(key);

		
		object = object[key];
	})

	return refObject;

}