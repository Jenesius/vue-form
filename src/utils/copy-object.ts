import checkPrimitiveType from "./check-primitive-type";

export default function copyObject<T>(object: T): T {
    const outputObject:any = {};

    if (checkPrimitiveType(object)) return object;
    Object.entries(object).forEach(([key, value]) => {

        outputObject[key] = copyObject(value);
    })

    return outputObject as T;
}