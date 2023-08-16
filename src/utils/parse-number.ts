/**
 * @description Попытка конвертации любой строки в число
 * */
export function parseNumber(data: unknown, defaultValue: number = 0) {
    if (typeof data !== 'string') return defaultValue;
    
    const parsedStr = data.replace(/[^\d,.+-]/g,'');
    if (parsedStr.length === 0) return defaultValue;
    return Number.parseFloat(parsedStr);
}