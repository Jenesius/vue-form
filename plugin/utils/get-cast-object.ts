import checkPrimitiveType from "./check-primitive-type";

export default function getCastObject(values: any, cast: any) {
	const output:any = {};
	
	Object.keys(cast)
	.forEach(name => {
		// В слепке дошли до true
		if (checkPrimitiveType(cast[name])) {
			output[name] = values[name];
			return;
		}
		output[name] = getCastObject(values[name], cast[name])
	});
	
	return output;
}
