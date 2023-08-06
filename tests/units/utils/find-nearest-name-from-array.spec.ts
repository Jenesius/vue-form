import findNearestNameFromArray
	from "../../../src/utils/find-nearest-name-from-array";

describe("Nearest name", () => {
	
	test("Name is founded.", () => {
		expect(findNearestNameFromArray('address.city', ['city', 'address'])).toBe('address')
	})
	
	test("Name not founded", () => {
		expect(findNearestNameFromArray('address.city', ['a', 'b', 'city', 'addre'])).toBe(undefined)
	})
	
	test("Founded more nearest", () => {
		expect(findNearestNameFromArray('address.city.name', ['address', 'city', 'address.city'])).toBe('address.city');
	})
	test("Founded more nearest", () => {
		expect(findNearestNameFromArray('address.city.name', ['address.city', 'address', 'city'])).toBe('address.city');
	})
})
