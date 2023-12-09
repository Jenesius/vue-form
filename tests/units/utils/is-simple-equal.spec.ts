import isSimpleEqual from "../../../src/utils/is-simple-equal";

describe("Testing is simple equal", () => {
	test("Basic values", () => {
		expect(isSimpleEqual(1, 0)).toEqual(false)
		expect(isSimpleEqual(1, "2")).toEqual(false)
		expect(isSimpleEqual(1, "1")).toEqual(false)
		expect(isSimpleEqual(0, false)).toEqual(false)
		expect(isSimpleEqual(true, 1)).toEqual(false)
		expect(isSimpleEqual({}, false)).toEqual(false)
		expect(isSimpleEqual({}, [])).toEqual(false)
		expect(isSimpleEqual(NaN, null)).toEqual(false)
	})
	test("Empty object and array should be equal", () => {
		expect(isSimpleEqual({}, {})).toEqual(true)
		expect(isSimpleEqual([], [])).toEqual(true)
	})
	test("Deep object should not be equal", () => {
		expect(isSimpleEqual({a: 1}, {a: 1})).toEqual(false);
	})
})