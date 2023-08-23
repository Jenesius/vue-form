/**
 * @description Function check that provided value is primitive.
 * */
export default function checkPrimitiveValue(value: unknown): value is boolean | number | string | symbol | null | undefined {
	return value === null || value === undefined || (typeof value !== 'object' && typeof value !== 'function');
}