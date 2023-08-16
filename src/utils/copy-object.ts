import isEndPointValue from "./is-end-point-value";

export default function copyObject<T>(object: T): T {
    const outputObject:any = {};

    if (isEndPointValue(object)) return object;
    Object.entries(object).forEach(([key, value]) => {

        outputObject[key] = copyObject(value);
    })

    return outputObject as T;
}