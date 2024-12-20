import {Value} from "../types";

/**
 * @description Функция вернёт значения поля из объекта. Prop может быть вложеным, указывается через точку
 * @description Функция возвращает значение по имени. Имя может быть составным.
 * Если имя не было найдёно - вернёт undefined
 * */

export default function getPropFromObject(obj: unknown, name: string) : Value | undefined{

    /**
     * Если переданный объект, явялется примитивным типом, то дальнейший спуск
     * по объекты - не возможет. Возвращается undefined
     * */
    if (!isRecord(obj)) return undefined;

    
    /**
     * Т.к. свойство объета - может быть мульти полем
     * {
     *     country.code: AU
     * }
     * Необходимо на каждом шаге проверять наличие
     * */
    if (name in obj) return obj[name];
    
    // Поиск точки. Мульти имени
    const _index = name.indexOf('.');

    // Если точка найдена. обрубаем первую часть и ищем рекурсивно далее
    if(_index > -1){
        /**
         * В ДАННОМ СЛУЧАЕ NAME СОСТАВНОЕ: address.city.street
         * МЫ ОБРЕЗАЕМ ДО ПЕРВОЙ ТОЧКИ И ИСПОЛЬЗУЕМ ТОЛЬКО address
         * ДАЛЕЕ РЕКУРСИВНО ОБРАБАТЫВАЕМ ДАЛЬШЕ
         * */
        const subName:string = name.substring(0, _index); // address (first name)

        if (subName in obj)
            return getPropFromObject(obj[subName], name.substring(_index + 1));

        return undefined;
    }


    return obj[name];
}

function isRecord(data: unknown): data is Record<string, unknown> {
    return (typeof data === 'object' && data !== null)
}