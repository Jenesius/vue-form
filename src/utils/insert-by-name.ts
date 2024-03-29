import splitName from "./split-name";
import isIterablePoint from "./is-iterable-point";

/**
 * @description Вставляет поле в объект. Поле может быть составным address.city.name. Вставка является GRAND.
 * @example address.city.name "Jenesius" => { address: { city: { name: "Jenesius"} } }
 * */
export default function insertByName(target: any, fieldName: string, value: any) {
    const parsedName = splitName(fieldName);
    
    parsedName.forEach((name, index) => {
        // The last
        if (index === parsedName.length - 1) return target[name] = value;
        
        if (!isIterablePoint(target[name])) target[name] = {};
        
        target = target[name]
    })
}