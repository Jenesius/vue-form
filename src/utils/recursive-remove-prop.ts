import parseFirstName from "./parse-first-name";

/**
 * @description В отличии от функции deletePropByName, эта функция удаляет props и сам объект, если после удаления в нём
 * не осталось ни одного props.
 * */
export default function recursiveRemoveProp(object: any, name: string) {
    const [firstName, secondName] = parseFirstName(name);
    if (name.length === 0) return;
    
    if (Object.prototype.hasOwnProperty.call(object, firstName)) {
        if (secondName.length === 0) delete object[firstName];
        else recursiveRemoveProp(object[firstName], secondName);
    }
    
    if (!(object[firstName] === null || object[firstName] === undefined) && Object.keys(object[firstName]).length === 0)
        delete object[firstName];
}