/**
 * @description Function using for search changes in mainObject. Will return Array<{name: string, newValue: string}>
 */
import getPropFromObject from "./get-prop-from-object";
import checkPrimitiveType from "./check-primitive-type";
import concatName from "./concat-name";
import iteratePoints from "./iterate-points";
import copyObject from "./copy-object";
import mergeObjects from "./merge-objects";

/**
 * @description Pushing ComparisonResult to array.
 * */
function add(array: IComparisonResult[], name: string, oldValue: any, newValue: any,) {
    array.push({
        name, newValue, oldValue
    })
}

export interface IComparisonResult {
    name: string,
    newValue: any,
    oldValue: any
}
/**
 * @description Check all point and set new value as undefined
 */
function resetEachValue(object: Record<string, any>, array: IComparisonResult[] = [], subName: string = '') {
    iteratePoints(object, subName).forEach(state => {
        array.push({
            name: state.name,
            oldValue:  state.value,
            newValue: undefined
        })
    })
    return array;
}

/**
 * @description Compares all points of oldValue/newValue
 * */
export function searchByComparison(oldValues: any, newValues: any, array: IComparisonResult[] = [], subName = '') {
    function addOld() {
        add(array, concatName(subName, oldPoints[oldIndex].name), oldPoints[oldIndex].value, undefined);
        oldIndex++;
    }
    function addNew() {
        add(array, concatName(subName, newPoints[newIndex].name), undefined, newPoints[newIndex].value);
        newIndex++;
    }

    const oldPoints = iteratePoints(oldValues), newPoints = iteratePoints(newValues);
    let oldIndex = 0, newIndex = 0;

    while(oldIndex < oldPoints.length && newIndex < newPoints.length) {
        const oldKey = oldPoints[oldIndex].name, newKey = newPoints[newIndex].name;
        if (oldKey === newKey) {
            add(array, concatName(subName, oldKey), oldPoints[oldIndex].value, newPoints[newIndex].value);
            oldIndex++; newIndex++;
        }
        else if (oldKey < newKey) {
            addOld()
        } else { // newKey < oldKey
            addNew()
        }
    }
    // If some points was not checked
    while(oldIndex < oldPoints.length) addOld()
    while(newIndex < newPoints.length) addNew()
    return array;
}

/**
 * @description Function the same with searchByComparison, but check only changes
 * @param {Object} changes Only changes. Not an output object
 * */
export function searchChangesByComparison(mainObject: any, changes: unknown, array: IComparisonResult[] = [], subName = '') {
    // if (typeof mainObject !== "object" || mainObject === null) throw FormErrors.ProvidedValueNotObject(mainObject);
    if (typeof changes !== "object" || changes === null) return [];


    Object.entries(changes).forEach(([key, newValue]) => {


        let oldValue = checkPrimitiveType(mainObject) ?  undefined : mainObject[key];
        const compositeName = concatName(subName, key);

        /**
         * Добавить работу с array
         * */
        const copyOldValue = copyObject(oldValue); // Copy old object. We don't need to changed it
        const mergedValue = !checkPrimitiveType(copyOldValue) && !checkPrimitiveType(newValue)? mergeObjects(copyOldValue, newValue) : newValue; // Merging copy with values

        add(array, compositeName, getPropFromObject(mainObject, key), mergedValue);


        if (checkPrimitiveType(newValue) && !checkPrimitiveType(oldValue)) {
            /**
             * Собрать по oldValue все ключи и значение undefined
             * combineKeys(oldValues, undefined);
             * */
            resetEachValue(oldValue, array, compositeName);
        }
        if (!checkPrimitiveType(newValue)) {
            searchChangesByComparison(oldValue, newValue, array, compositeName);
        }
    })

    return array;
}


