
import bypassObject from "./bypass-object";
import isEndPointValue from "./is-end-point-value";
import parseFirstName from "./parse-first-name";
import splitName from "./split-name";
import insertByName from "./insert-by-name";
import checkNameInObject from "./check-name-in-object";
import getPropFromObject from "./get-prop-from-object";


/**
 * @description На вход получает объект данных, возвращает максимально упрощённо разложенный объект. (Предыдущее название:
 * DeepenObject)
 * {                                        {
 *     address.city.name: 'Berlin'  --->        address: { city: { name: 'Berlin' } }
 * }                                        }
 * */

export default function grandObject(object: any, data: any = {}) {
	if (isEndPointValue(object)) return ;
	
	Object.entries(object)
	.forEach(([key, value]) => {
		
		if (!checkNameInObject(data, key) && !isEndPointValue(value)) insertByName(data, key, {})
		
		if (isEndPointValue(value)) {
			insertByName(data, key, value);
		}
		else {
			grandObject(value, getPropFromObject(data, key))
		}
	})
	
	return data;
}
export function grandValue(name: string, value: any) {
	return grandObject({
		[name]: value
	})
}

