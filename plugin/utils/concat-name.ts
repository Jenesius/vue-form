/**
 * @description Concat names. Method using for check first name. The correct name is xxx.xxx. Wrong value is .xxx or xxx.
 * */
export default function concatName(sub: string, name: string) {
    return (sub.length) ? `${sub}.${name}` : name;
}