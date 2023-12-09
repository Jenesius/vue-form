export default function isObjectLike(value:unknown) {
	return value != null && typeof value == 'object';
}