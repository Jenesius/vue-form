import Form from "../../plugin/classes/Form";

describe("Form changes", () => {

	test("Should be empty object", () => {
		const form = new Form();
		expect(form.changes).toEqual({})
	})
	test("After setValues changes must be empty", () => {
		const form = new Form();
		form.setValues({
			name: 'test'
		})
		expect(form.changes).toEqual({})
	})
	test("Simple changes after change", () => {
		const form = new Form();
		form.setValues({
			name: 'Jax'
		})
		form.change({
			age: 'test'
		})
		expect(form.changes).toEqual({
			age: 'test'
		})
	})
	test("Override changes", () => {
		const form = new Form();
		form.setValues( { name: "Jack" } )
		form.setValues( {
			age: 23
		})
		form.setValues({
			address: {
				name: "home"
			}
		})
		form.change({
			address: {
				city: "Berlin"
			}
		})
		form.change({
			login: 'test'
		})
		expect(form.changes).toEqual({
			address: { city: "Berlin" },
			login: "test"
		})
	})

})