import insertByName from "./insert-by-name";
import bypassObject from "./bypass-object";
import isIterablePoint from "./is-iterable-point";


/**
 * @description На вход получает объект данных, возвращает максимально упрощённо разложенный объект. (Предыдущее название:
 * DeepenObject)
 * {                                        {
 *     address.city.name: 'Berlin'  --->        address: { city: { name: 'Berlin' } }
 * }                                        }
 * */

export default function grandObject(object: any) {
	if (!isIterablePoint(object)) return {};

	return bypassObject(object).reduce((acc, item) => {
		insertByName(acc, item.name, item.value)
		return acc;
	}, {})
}

