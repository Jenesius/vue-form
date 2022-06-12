import checkCompositeName from "../../plugin/utils/check-composite-name";

describe("Check composite name", () => {
	
	test("simple name", () => {
		expect(checkCompositeName('address', 'address.name')).toBe(true)
	})
	test("Wrong first chapter name", () => {
		expect(checkCompositeName('a.b', 'c.b')).toBe(false)
	})
	test("Wrong second chapter name", () => {
		expect(checkCompositeName("a.b", "a.c.d")).toBe(false)
	})
	test("Hard name", () => {
		expect(checkCompositeName("a.b.a.b.a.b", "a.b.a.b.a.b.c.c.c.c")).toBe(true);
	})
	
})
