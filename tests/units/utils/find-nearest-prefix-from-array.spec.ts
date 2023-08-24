import findNearestPrefixFromArray from "../../../src/utils/find-nearest-prefix-from-array";

describe("Nearest name", () => {
    
    test("Name is founded.", () => {
        expect(findNearestPrefixFromArray(['city', 'address', 'address.city'], 'address.city' )).toBe('address')
    })
    
    test("Name not founded", () => {
        expect(findNearestPrefixFromArray(['a', 'b', 'city', 'addre'], 'address.city' )).toBe(undefined)
    })
    
    test("Founded more nearest", () => {
        expect(findNearestPrefixFromArray(['address', 'city', 'address.city'], 'address.city.name')).toBe('address.city');
    })
    test("Founded more nearest with other order", () => {
        expect(findNearestPrefixFromArray(['address.city', 'address', 'city'], 'address.city.name')).toBe('address.city');
    })
})
