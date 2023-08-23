import Form from "../../../src/classes/Form";

describe("Form accept changes", () => {
	test("Accept clean changes", () => {
		const form = new Form();
		form.setValues({test: 1});
		form.acceptChanges("address");
		expect(form.changes).toEqual({})
		expect(form.values).toEqual({test: 1})
	})
	test("Accept primitive value", () => {
		const form = new Form();
		form.setValues({test: 1});
		form.change({name: "Jack"});
		form.acceptChanges("name");
		expect(form.changes).toEqual({})
		expect(form.values).toEqual({test: 1, name: "Jack"})
	})
	test("Accept object value", () =>{
		const form = new Form();
		form.setValues({test: 1});
		form.change({address: {
			city: {
				index: 111
			}
		}});
		form.acceptChanges("address");
		expect(form.changes).toEqual({})
		expect(form.values).toEqual({test: 1, address: { city:{ index: 111 } }})
	})
	test("Accept one child of multi object", () => {
		const _changes = { address: { city: { index: 111 }, country: "Canada" } };
		const form = new Form();
		form.change(_changes);
		form.acceptChanges('address.city');
		expect(form.changes).toEqual({ address: {country: "Canada"} })
		expect(form.pureValues).toEqual({ address: { city: { index: 111 } } })
	})
	test("Accept one child of single object", () => {
		const _changes = { address: { city: { index: 111 }} };
		const form = new Form();
		form.change(_changes);
		form.acceptChanges('address.city.index');
		expect(form.changes).toEqual({ })
		expect(form.pureValues).toEqual({ address: { city: { index: 111 } } })
	})
	test("Accept multi value for primitive", () => {
		const form = new Form();
		form.change({
			age: 25
		})
		form.acceptChanges('age.index.code');

		expect(form.changes).toEqual({
			age: 25
		})
		expect(form.pureValues).toEqual({})
	})
	test("Accept clean without name for clean changes", () =>{})
	test("Accept clean without name", () =>{})
})