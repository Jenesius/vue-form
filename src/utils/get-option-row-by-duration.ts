import {OptionRow} from "../types";

/**
 * @description Метод возвращает OptionRow элемента, который будет являться проецирование duration на текущий элемент.
 * @param options Массив всех опций
 * @param currentValue Текущее значение
 * @param duration Величина смещения
 */
export default function getOptionRowByDuration(options: OptionRow[], currentValue: unknown, duration: number) {
	let index =  options.findIndex(item => item.value === currentValue) ;
	index = index === -1 ? duration > 0 ? -1 : 0 : index;
	index = index + duration;

	if (index < 0) index = options.length + index;

	return options[index % options.length];
}