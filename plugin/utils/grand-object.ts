import bypassObject from "./bypass-object";


/**
 * @description На вход получает объект данных, возвращает максимально упрощённо разложенный объект. (Предыдущее название:
 * DeepenObject)
 * {                                        {
 *     address.city.name: 'Berlin'  --->        address: { city: { name: 'Berlin' } }
 * }                                        }
 * */

export default function grandObject(object: any) {
	
	return bypassObject(object)
	.reduce((acc: any, {path, value}) => {
		
		
		let link = acc;
		let index = 0;
		
		while (index !== path.length) {
			const name = path[index];
			
			// last item
			if (index === path.length - 1) {
				
				// value = JSON.parse(JSON.stringify(value))
				link[name] = value;
			}
			else {
				link = link[name] || (() => {
					link[name] = {};
					return link[name];
				})()
			}
			index++;
		}
		return acc;
	}, {})
	
}
export function grandValue(name: string, value: any) {
	return grandObject({
		[name]: value
	})
}

