import isObjectLike from "./is-object-like";
import isEmptyObject from "./is-empty-object";
import isEmptyArray from "./is-empty-array";

/**
 * @description Простейшая проверка на эквивалентность. Не является deep.
 */
export default function isSimpleEqual(value: unknown, other: unknown) {
	if (value === other) {
		return true;
	}
	if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
		return value !== value && other !== other;
	}
	if (isEmptyObject(value) && isEmptyObject(other)) return true;
	if (isEmptyArray(value) && isEmptyArray(other)) return true;

	return false;
}
