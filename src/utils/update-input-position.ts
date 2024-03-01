import {OptionRow} from "../types";
import getOptionRowByDuration from "./get-option-row-by-duration";

/**
 * @description Method using for to move bottom/up options
 * @param params.value Current value (modelValue)
 * @param {Number} params.duration Duration to step (1, -1 or other)
 *
 * */
export default function updateInputPosition(params: {options: OptionRow[], value: any, onInput: ((data: any) => unknown), duration: number}) {
    params.onInput(getOptionRowByDuration(params.options, params.value, params.duration));
}

