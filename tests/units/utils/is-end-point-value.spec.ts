import isEndPointValue from "../../../src/utils/is-end-point-value";

describe("Is End Point Value", () => {
	test("Array is not deep value", () => {
		expect(isEndPointValue([1,2])).toBe(true)
	})
	test("Frozen object is not deep value", () => {
		const data = Object.freeze({a: 1})
		expect(isEndPointValue(data)).toBe(true)
	})
	test("Primitive is not deep value", () => {
		expect(isEndPointValue(1)).toBe(true)
		expect(isEndPointValue("1")).toBe(true)
		expect(isEndPointValue(null)).toBe(true)
		expect(isEndPointValue(undefined)).toBe(true)
		expect(isEndPointValue(true)).toBe(true)
	})
	test("Object is deep value", () => {
		expect(isEndPointValue({
			name: "Jenesius"
		})).toBe(false)
	})
})