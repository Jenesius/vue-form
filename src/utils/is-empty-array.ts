export default function isEmptyArray(value: unknown) {
	return Array.isArray(value) && value.length === 0;
}