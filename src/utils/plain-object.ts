import bypassObject from "./bypass-object";

export default function plainObject(object: any) {
	return bypassObject(object).reduce((acc: any, {path, value}) => {
		acc[path.join('.')] = value;
		return acc;
	}, {});
}
