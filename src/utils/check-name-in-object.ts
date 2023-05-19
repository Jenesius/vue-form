import splitName from "./split-name";

/**
 * @description Return true if object include name, otherwise - false. Object should be granted!
 * @example
 *   { user: { id: 2, address: {city: "Mars"} } }
 *   user.id         -> true
 *   user            -> true
 *   user.name       -> false
 *   user.name.label -> false
 * */
export default function checkNameInObject<T extends Record<string, any>>(object: T, searchName: string ) {
    const names = splitName(searchName);

    for(let i = 0; i < names.length; i++) {
        const name = names[i];
        try {
            if ((name in object) === false || !object.hasOwnProperty(name)) return false;
        } catch (e) {
            return false;
        }
        object = object[name];
    }

    return true;
}