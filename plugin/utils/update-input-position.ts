import {OptionRow} from "../types";

/**
 * @description Method using for to move bottom/up options
 * @param params.value Current value (modelValue)
 * @param {Number} params.duration Duration to step (1, -1 or other)
 *
 * */
export default function updateInputPosition(params: {options: OptionRow[], value: any, onInput: any, duration: number}) {

    const values = params.options.map(v => v.value);

    let currentIndex = values.indexOf(params.value) + params.duration;

    // Limits
    if (currentIndex >= values.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = values.length - 1;

    params.onInput(values[currentIndex]);
}