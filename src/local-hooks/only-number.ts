export default function onlyNumber(a: unknown) {
	if (typeof a !== "string") return '';
	return a.replace(/[^\d,.+-]/,'')
}