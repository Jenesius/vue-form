import isEndPointValue from "./is-end-point-value";

interface Endpoint {
	set(v: any): void, // For set new value
	path: string[],
	value: any
}
/**
 * @description Method for iterate for each end point instance.
 * @return {Endpoint} EndpointController to manipulate with point.
 * @example { address: {city: "Berlin" } } -> [ { path: ["address", "city"], value: "Berlin", set(){} } ]
 */
export default function iterateEndpoint(value: any) {
	function next(endpointsArray: Endpoint[], value: any, path: string[] = []) {
		if (isEndPointValue(value)) return endpointsArray;

		Object.keys(value).forEach(key => {
			const parsedKey = key.split('.');
			const currentValue = value[key];
			const newPath = [...path, ...parsedKey];
			if (isEndPointValue(currentValue)) {
				endpointsArray.push({
					set(v: any) {
						value[key] = v;
					},
					value: currentValue,
					path: newPath
				})
				return;
			}
			next(endpointsArray, currentValue, newPath);
		})
		return endpointsArray;
	}

	/**
	 * @description Array of output's controller
	 */
	const outputArray:Endpoint[] = [];

	return next(outputArray, value);
}

