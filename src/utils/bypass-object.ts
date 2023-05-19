import isEndPointValue from "./is-end-point-value";

function step(array: BypassItem[], value: any, path: string[] = []): void {
	if (isEndPointValue(value)) return;
	
	Object.keys(value)
	.forEach(key => {

		const parsedKey = key.split('.');
		
		const p = [...path, ...parsedKey]; // Step path
		const v = value[key];	  // Step value
		
		if (isEndPointValue(v)) {
			array.push({
				path: p,
				value: v
			})
			return;
		}

		step(array, v, p)
	})
}
/**
 * @description Функция проходит по всем полям объекта.
 * @return Array of {path: string[], value: any}
 * @example
 * { person: { profile: { head: { mouth: 1, eyes: 2 } } } }
 * Result:
 * [
 *   {
 *     path: ['person', 'profile', 'head', 'mouth'],
 *     value: 1
 *   },
 *   {
 *     path: ['person', 'profile', 'head', 'eyes'],
 *     value: 2
 *   }
 * ]
 */
export default function bypassObject(object: any): BypassItem[] {
	const array:BypassItem[] = [];
	
	step(array, object);
	
	return array
}

interface BypassItem {
	value: any,
	path: string[]
}





