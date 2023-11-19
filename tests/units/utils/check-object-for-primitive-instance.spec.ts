import checkObjectForNotIterableInstance from "../../../src/utils/check-object-for-primitive-instance";

describe("Check object for primitive instance", () => {
	test("Simple object must return false", () => expect(checkObjectForNotIterableInstance({})).toBe(false));
	test("Date must return true", () => expect(checkObjectForNotIterableInstance(new Date())).toBe(true));
	test("Blob object must return true", () => expect(checkObjectForNotIterableInstance(new Blob())).toBe(true));
	test("Error object must return true", () => expect(checkObjectForNotIterableInstance(new Error())).toBe(true));
	test("Number object must return false", () => expect(checkObjectForNotIterableInstance(5)).toBe(false));
	test("File object must return true", () => expect(checkObjectForNotIterableInstance(new File([], 'test'))).toBe(true));
})