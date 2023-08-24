/**
 * @description Return true if the prefix is some parent of provided field name.
 * @example address.city.name address -> true
 * @example user.type.index user.type -> true
 * @example position.city.type city -> false
 * @example name name -> false
 * */
export default function isPrefixName(fieldName: string, prefix: string) {
    return (new RegExp(`^${prefix}\\.`)).test(fieldName);
}