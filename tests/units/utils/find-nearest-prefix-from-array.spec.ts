import findNearestPrefixFromArray from "../../../src/utils/find-nearest-prefix-from-array";

describe("Nearest name", () => {
    
    test("Name is founded.", () => {
        expect(findNearestPrefixFromArray('address.city', ['city', 'address', 'address.city'])).toBe('address')
    })
    
    test("Name not founded", () => {
        expect(findNearestPrefixFromArray('address.city', ['a', 'b', 'city', 'addre'])).toBe(undefined)
    })
    
    test("Founded more nearest", () => {
        expect(findNearestPrefixFromArray('address.city.name', ['address', 'city', 'address.city'])).toBe('address.city');
    })
    test("Founded more nearest with other order", () => {
        expect(findNearestPrefixFromArray('address.city.name', ['address.city', 'address', 'city'])).toBe('address.city');
    })
})
