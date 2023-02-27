export default function softReplaceObject(target: Record<string, any>, data: object) {
	const cast: Record<string, true> = {};

	Object.entries(data)
	.forEach(([key, value]) => {
		cast[key] = true;

		// Values is equal for key
		if (target[key] === value) return;
		target[key] = value
	})

	Object.keys(target)
	.forEach(key => {
		if (cast[key]) delete target[key];
	})
}