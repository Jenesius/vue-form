import {OptionRow} from "../types";

/**
 * @description Converting Options Object to OptionsRow[]
 * */
export default function convertOptionsObject(object: Record<string | number, string | number>): OptionRow[]
export default function convertOptionsObject(object: Record<string, any>, type: 'reverse'): OptionRow[]
export default function convertOptionsObject(object:OptionsObject, type?: 'reverse'): OptionRow[] {
	function parse(obj: [any, any]) {
		return {
			value: obj[0],
			label: String(obj[1])
		}
	}
	function reverseParse(obj: [any, any]) {
		return {
			value: obj[1],
			label: String(obj[0])
		}
	}

	const handle = type === 'reverse' ? reverseParse : parse;

	return Object.entries(object).map(handle)
}

type OptionsObject = Record<any, any>