import isIterablePoint from "./is-iterable-point";

export default function getCastObject(values: any, cast: any) {
	const output:any = {};
	
	Object.keys(cast)
	.forEach(name => {
		// В слепке дошли до true
		if (!isIterablePoint(cast[name])) {
			output[name] = values[name];
			return;
		}
		output[name] = getCastObject(values[name], cast[name])
	});
	
	return output;
}
