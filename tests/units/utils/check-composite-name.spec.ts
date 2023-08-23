import checkCompositeName from "../../../src/utils/check-composite-name";

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
	test("Should return true if Equal", () => expect(checkCompositeName("address.city", "address.city")).toBe(true))
	test("Should return true if start with", () => expect(checkCompositeName( "address.city", "address.city.index")).toBe(true))
	test("Should return false if not full start with", () => expect(checkCompositeName("address.name", "address.city")).toBe(false))
	test("Should return false if dont start with", () => expect(checkCompositeName("index", "address.city")).toBe(false))
	test("Should return false if start with but is not part of name", () => expect(checkCompositeName("address.cityMol", "address.city")).toBe(false))
	test("Should return false if parent not full start with", () => expect(checkCompositeName("address.cit", "address.city")).toBe(false))
	test("Should return false if child dont start with parent", () => expect(checkCompositeName("city", "address.city")).toBe(false))

})
