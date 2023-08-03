/**
 * @description Concat names. Method using for check first name. The correct name is xxx.xxx. Wrong value is .xxx or xxx.
 * */
export default function concatName(...names: unknown[]) {
    return names.filter(a => (typeof a === 'string' && a.length !== 0)).join('.')
}