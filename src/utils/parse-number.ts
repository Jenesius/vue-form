import STORE from "../config/store";

/**
 * @description Попытка конвертации любой строки в число
 * */

export function parseNumber(data: unknown, defaultValue: any = 0) {

    if (typeof data !== 'string') return defaultValue;

    const parsedResult = new RegExp(/^([-+]?)([^.,+-]*)(.*)/g).exec(data);

    if (parsedResult === null) return defaultValue;

    try {
        const parsedSting = [
            parsedResult[1].length ? parsedResult[1] : '+',
            parsedResult[2].replace(/[^0-9]/g, ''),
            '.',
            parsedResult[3].replace(/[^0-9]/g, ''),
        ].join('')

        // if parsedString is +.
        if (parsedSting.length === 2) return defaultValue;

        const result = Number.parseFloat(parsedSting)
        return  Number.isNaN(result) ? defaultValue : result
    } catch (e) {
        return defaultValue;
    }
}
