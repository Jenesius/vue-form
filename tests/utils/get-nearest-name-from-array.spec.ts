import getNearestNameFromArray
	from "../../plugin/utils/get-nearest-name-from-array";

describe("Nearest name", () => {
	
	test("Name is founded.", () => {
		expect(getNearestNameFromArray('address.city', ['city', 'address'])).toBe('address')
	})
	
	test("Name not founded", () => {
		expect(getNearestNameFromArray('address.city', ['a', 'b', 'city', 'addre'])).toBe(undefined)
	})
	
	test("Founded more nearest", () => {
		expect(getNearestNameFromArray('address.city.name', ['address', 'city', 'address.city'])).toBe('address.city');
	})
	test("Founded more nearest", () => {
		expect(getNearestNameFromArray('address.city.name', ['address.city', 'address', 'city'])).toBe('address.city');
	})
})
