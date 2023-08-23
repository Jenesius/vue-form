import isEndPointValue from "./is-end-point-value";
import isEmptyObject from "./is-empty-object";

/**
 * @description Функция используется для логики формы. Т.к. нам часто нужно проходить по объектам и перебирать их свойства,
 * то это функция отвечает на вопрос: Является ли переданное значение итерируемым и можно ли зайти внутрь его.
 * */
export default function isIterablePoint(value: unknown) {
	return !(isEndPointValue(value) || isEmptyObject(value))
}