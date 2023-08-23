import isIterablePoint from "./../../../src/utils/is-iterable-point";

describe("Is End Point Value", () => {
	test("Array is not deep value", () => {
		expect(isIterablePoint([1,2])).toBe(false)
	})
	test("Function is not deep value", () => {
		const value = () => 4
		expect(isIterablePoint(value)).toBe(false)
	})
	test("Frozen object is not deep value", () => {
		const data = Object.freeze({a: 1})
		expect(isIterablePoint(data)).toBe(false)
	})
	test("Primitive is not deep value", () => {
		expect(isIterablePoint(1)).toBe(false)
		expect(isIterablePoint("1")).toBe(false)
		expect(isIterablePoint(null)).toBe(false)
		expect(isIterablePoint(undefined)).toBe(false)
		expect(isIterablePoint(true)).toBe(false)
	})
	test("Object is deep value", () => {
		expect(isIterablePoint({
			name: "Jenesius"
		})).toBe(true)
	})
})