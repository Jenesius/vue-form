/**
 * @description The method is used to add an element to the array if it does not exist, and to remove an element from the array when
 * Help with splicing in any case.
 * @param array
 * @param value
 */
export default function toggleValueFromArray<T>(array: T[], value: T) {
	const index = array.indexOf(value);
	if (index === -1) array.push(value);
	else array.splice(index, 1);

	return array;
}