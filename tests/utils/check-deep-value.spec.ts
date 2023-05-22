import checkDeepValue from "./../../src/utils/check-deep-value";

describe("Check deep value", () => {
	test("Array is not deep value", () => {
		expect(checkDeepValue([1,2])).toBe(false)
	})
	test("Frozen object is not deep value", () => {
		const data = Object.freeze({a: 1})
		expect(checkDeepValue(data)).toBe(false)
	})
	test("Primitive is not deep value", () => {
		expect(checkDeepValue(1)).toBe(false)
		expect(checkDeepValue("1")).toBe(false)
		expect(checkDeepValue(null)).toBe(false)
		expect(checkDeepValue(undefined)).toBe(false)
		expect(checkDeepValue(true)).toBe(false)
	})
	test("Object is deep value", () => {
		expect(checkDeepValue({
			name: "Jenesius"
		})).toBe(true)
	})
})