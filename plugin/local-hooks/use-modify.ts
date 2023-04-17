import {StringModify} from "../types";
import warn from "../debug/warn";

type ModifyParam = undefined | StringModify | Array<StringModify | undefined>
export default function useModify(callbackModifyProps: () => ModifyParam) {
	function parse(param: ModifyParam) {
		if (!param) return [];
		if (!Array.isArray(param)) return [param];
		return param.filter(a => a !== undefined) as StringModify[]
	}

	return function execute(v: unknown): string {
		const arr = parse(callbackModifyProps()); // Getting array of handlers

		arr.forEach(callback => v = callback(v));
		try {
			arr.forEach(callback => v = callback(v));
		} catch (e) {
			warn('[modify]', `Error in modify callback with value ${v}`, e);
		}

		return !!v ? String(v) : '';
	}
}