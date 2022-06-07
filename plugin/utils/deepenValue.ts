import mergeObjects from "./mergeObjects";

/**
 * @deprecated
 * раскладывает составное значение
 * */
export function deepenObject(value: any) {
	
	if (typeof value !== 'object') return value;
	
	if (value === null || value === undefined) return  value;
	
	return Object.keys(value).reduce((acc, key) =>
		mergeObjects(acc, deepenValue(key, value[key])), {})
		
}


/**
 * @deprecated
 * Раскладывает составное имя и значение
 * */
export default function deepenValue(name: string, value: any): any {
	
	const output: {
		[name: string]: any
	} = {};
	let currentLink = output;
	
	// Разбиваем имя на подимена, если состоит из точек
	const splitName = name.split('.');
	
	splitName.forEach((n, index) => {

		currentLink[n] = {};
		if (index === splitName.length - 1) currentLink[n] = deepenObject(value);
		currentLink = currentLink[n];
	})
	
	
	return output;
}
