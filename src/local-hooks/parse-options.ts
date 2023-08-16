import {OptionRow} from "../types";
import convertOptionsObject from "../utils/convert-options-object";

export function parseOptions(v: OptionRow[] | Record<string, any>) {
	if (!v) return [];
	if (Array.isArray(v)) return v;

	return convertOptionsObject(v);
}