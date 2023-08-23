import isIterablePoint from "./is-iterable-point";
import isEmptyObject from "./is-empty-object";

export default function copyObject<T>(object: T): T {
    const outputObject:any = {};

    if (!isIterablePoint(object) && !isEmptyObject(object)) return object;
    Object.entries(object).forEach(([key, value]) => {

        outputObject[key] = copyObject(value);
    })

    return outputObject as T;
}