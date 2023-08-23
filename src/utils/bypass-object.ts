import concatName from "./concat-name";
import isIterablePoint from "./is-iterable-point";
import splitName from "./split-name";

/**
 * @description Функция проходит по всем конечным элементам объекта.
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

function step(array: BypassItem[], value: any, path: string[] = []): void {
	if (!isIterablePoint(value)) return;
	
	Object.keys(value)
	.forEach(key => {

		const parsedKey = splitName(key);
		
		const p = [...path, ...parsedKey]; // Step path
		const v = value[key];	  // Step value
		
		if (!isIterablePoint(v)) {
			array.push({
				path: p,
				value: v,
				name: concatName(...p),
				set: (newValue) => value[key] = newValue
			})
			return;
		}

		step(array, v, p)
	})
}

interface BypassItem {
	value: any,
	path: string[],
	name: string,

	set: (x: any) => void
}





