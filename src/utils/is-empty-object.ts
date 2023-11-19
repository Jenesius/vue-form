export default function isEmptyObject(data: unknown) {
    if (typeof data !== "object" || data === null) return false;

    return !!(
        data &&
        Object.keys(data).length === 0 &&
        data.constructor === Object
    );
}