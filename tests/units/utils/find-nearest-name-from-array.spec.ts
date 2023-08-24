import findNearestNameFromArray
	from "../../../src/utils/find-nearest-name-from-array";

describe("Nearest name", () => {
	
	test("Name is founded.", () => {
		expect(findNearestNameFromArray(['city', 'address'], 'address.city' )).toBe('address')
	})
	
	test("Name not founded", () => {
		expect(findNearestNameFromArray(['a', 'b', 'city', 'addre'], 'address.city')).toBe(undefined)
	})
	
	test("Founded more nearest", () => {
		expect(findNearestNameFromArray(['address', 'city', 'address.city'], 'address.city.name')).toBe('address.city');
	})
	test("Founded more nearest", () => {
		expect(findNearestNameFromArray(['address.city', 'address', 'city'], 'address.city.name' )).toBe('address.city');
	})
})
