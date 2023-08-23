import checkPrimitiveValue from "../../../src/utils/check-primitive-value";

describe("Check primitive value", () => {

	test("Boolean should be true", () => expect(checkPrimitiveValue(true)).toBe(true))
	test("Number should be true", () => expect(checkPrimitiveValue(4)).toBe(true))
	test("String should be true", () => expect(checkPrimitiveValue("123")).toBe(true))
	test("Null should be true", () => expect(checkPrimitiveValue(null)).toBe(true))
	test("Undefined should be true", () => expect(checkPrimitiveValue(undefined)).toBe(true))
	test("Array should be false", () => expect(checkPrimitiveValue([])).toBe(false))
	test("Object should be false", () => expect(checkPrimitiveValue({})).toBe(false))
	test("Function should be false", () => expect(checkPrimitiveValue(() => {})).toBe(false))
})