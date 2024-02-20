/**
 * @description The method is used to add an element to the array if it does not exist, and to remove an element from the array when
 * Help with splicing in any case.
 * @param array
 * @param value
 * @param limit Предельное число элементов в массиве.
 */
export default function toggleValueFromArray<T>(array: T[], value: T, limit?: number) {
	const index = array.indexOf(value);
	if (index === -1) {
		if (limit === undefined || (typeof limit === 'number' && Number.isFinite(limit) && array.length < limit))
		array.push(value);
	}
	else array.splice(index, 1);

	return array;
}