/**
 * @description Function using for search changes in mainObject. Will return Array<{name: string, newValue: string}>
 */
import getPropFromObject from "./get-prop-from-object";
import checkPrimitiveType from "./check-primitive-type";

/**
 * @description Concat names. Method using for check first name. The correct name is xxx.xxx. Wrong value is .xxx or xxx.
 * */
function concatName(sub: string, name: string) {
    return (sub.length) ? `${sub}.${name}` : name;
}
function add (array: IComparisonResult[], name: string, newValue: any, oldValue: any) {
    array.push({
        name, newValue, oldValue
    })
}

export interface IComparisonResult {
    name: string,
    newValue: any,
    oldValue: any
}

function resetEachValue(object: Record<string, any>, array: IComparisonResult[] = [], subName: string = '') {
    Object.entries(object).forEach(([key, oldValue]) => {
        const compositeName = concatName(subName, key);

        array.push({
            name: compositeName,
            oldValue,
            newValue: undefined
        })
        if (!checkPrimitiveType(oldValue)) resetEachValue(oldValue, array, compositeName);
    })
    return array;
}
export function searchByComparison(oldValues: any, newValues: any, array: IComparisonResult[] = [], subName = '') {
    if (checkPrimitiveType(oldValues) || checkPrimitiveType(newValues)) {
        add(array, subName, newValues, oldValues);

        return array;
    }

    if (subName.length) {
        add(array, subName, newValues, oldValues);
    }

    let arrayOld = Object.keys(oldValues) || [],
        arrayNew = Object.keys(newValues) || [],
        indexOld = 0,
        indexNew = 0;

    while (indexOld !== arrayOld.length || indexNew !== arrayNew.length) {
        const keyOld = arrayOld[indexOld],
              keyNew = arrayNew[indexNew],
              valueOld = oldValues[keyOld],
              valueNew = newValues[keyNew];

        if (keyOld === undefined) {
            searchByComparison(valueOld, valueNew, array, concatName(subName, keyNew) );
            indexNew++;
        }
        if (keyNew === undefined) {
            searchByComparison(valueOld, valueNew, array, concatName(subName, keyOld) );
            indexOld++;
        }

        if (keyOld === keyNew && keyOld !== undefined) {
            // add(array, concatName(subName, keyOld), valueNew, valueOld);
            searchByComparison(valueOld, valueNew, array, concatName(subName, keyOld));
            indexNew++; indexOld++;
        }

        if (keyOld < keyNew) {
            searchByComparison(valueOld, undefined, array, concatName(subName, keyOld));
            indexOld++;
        }
        if (keyNew < keyOld) {
            searchByComparison(undefined, valueNew, array, concatName(subName, keyNew) );
            indexNew++;
        }
    }

    return array;
}

export default function searchChangesByComparison(mainObject: any, changes: unknown, array: IComparisonResult[] = [], subName = '') {
    // if (typeof mainObject !== "object" || mainObject === null) throw FormErrors.ProvidedValueNotObject(mainObject);
    if (typeof changes !== "object" || changes === null) return [];


    Object.entries(changes).forEach(([key, newValue]) => {


        let oldValue = checkPrimitiveType(mainObject) ?  undefined : mainObject[key];
        const compositeName = concatName(subName, key);

        add(array, compositeName, newValue, getPropFromObject(mainObject, key));


        if (checkPrimitiveType(newValue) && !checkPrimitiveType(oldValue)) {
            /**
             * Собрать по oldValue все ключи и значение undefined
             * combineKeys(oldValues, undefined);
             * */
            resetEachValue(oldValue, array, compositeName);
        }
        if (!checkPrimitiveType(newValue)) {
            /**
             * Добавить работу с array
             * */
            searchChangesByComparison(oldValue, newValue, array, compositeName);
        }
    })

    return array;
}


