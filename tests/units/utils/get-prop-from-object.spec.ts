import getPropFromObject from "../../../src/utils/get-prop-from-object";

describe("Get prop from object", () => {
	test("Should return primitive values by single name", () => {
		expect(getPropFromObject({name: "Jack"}, "name")).toBe("Jack")
	})
	test("Name not founded", () => {
		expect(getPropFromObject({address: '1'}, 'a')).toBe(undefined);
	})
	test("Should return undefined if name is multiple, but value if not iterable", () => {
		expect(getPropFromObject({address: '1'}, 'address.name')).toBe(undefined);
	})
	test("Should return value by multiple key", () => {
		expect(getPropFromObject({address: {city: "Berlin"}}, 'address.city')).toBe("Berlin");
	})
})
