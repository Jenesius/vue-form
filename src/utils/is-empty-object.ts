export default function isEmptyObject(data: unknown) {
    if (typeof data !== "object" || data === null) return false;
    return Object.keys(data).length === 0;
}