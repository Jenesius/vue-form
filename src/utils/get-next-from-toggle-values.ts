import {ToggleValues} from "../types";
export default function getNextFormToggleValues(values: ToggleValues, value: any) {
	return values[0] !== value ? values[0] : values[1]
}
