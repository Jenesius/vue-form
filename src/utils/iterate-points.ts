import concatName from "./concat-name";
import isIterablePoint from "./is-iterable-point";

interface IPoint {
    name: string,
    value: any
}
/**
 * @description Method return array witch includes all points of provided object.
 * @example {a: 1, city: {code: 1}} =>
 * [
 *  { name: 'a',            value: 1            },
 *  { name: 'city',         value: {code: 1}    },
 *  { name: 'city.code',    value: 1            },
 * ]
 */
export default function iteratePoints(object: unknown, startWith = '', array: IPoint[] = []) {
    if (typeof object !== 'object' || object === null) return array;

    Object.entries(object).forEach(([key, value]) => {
        const name = concatName(startWith, key);
        array.push({
            name, value
        })
        if (isIterablePoint(value)) iteratePoints(value, name, array)
    })
    return array;
}