/**
 * @description Return true if the prefix is some parent of provided field name. In other words, it checks that the
 * second parameter is the parent of the first.
 *
 * @example
 * // returns true
 * isPrefixName("address.city.name", "address");
 * @example
 * // return true
 * isPrefixName("user.type.index", "user.type")
 * @example
 * // returns false
 * isPrefixName("position.city.type", "city");
 * @example
 * // return false
 * isPrefixName("name", "name");
 *
 * @param fieldName Check Field
 * @param prefix Parent Field or Prefix value
 * */
export default function isPrefixName(fieldName: string, prefix: string) {
    return (new RegExp(`^${prefix}\\.`)).test(fieldName);
}