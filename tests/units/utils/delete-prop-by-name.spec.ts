import deletePropByName from "../../../src/utils/delete-prop-by-name";

describe("Delete prop by name", () => {
	

	test("Object is primitive", () => {
		expect(deletePropByName(5, "address")).toBe(false)
	})
	
	test("Name not founded", () => {
		expect(deletePropByName({address: '1'}, 'a')).toBe(false);
	})
	test("Success removing simple name", () => {
		
		const object = {
			address: 1
		}
		expect(deletePropByName(object, 'address')).toBe(true);
		expect(object).toEqual({})
		
	})
	test("Success removing deep name", () => {
		
		const object = {
			address: {
				city: {
					code: 1
				}
			}
		}
		expect(deletePropByName(object, 'address.city.code')).toBe(true);
		expect(object).toEqual({address: {city: {}}})
		
	})
	
})
