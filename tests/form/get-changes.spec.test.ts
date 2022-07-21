import Form from "../../plugin/classes/Form";

describe("Form.changes", () => {

	test("Empty Object. Form without changes", () => {
		const form = new Form();
		expect(form.changes).toEqual({});
	})

	test("Empty Object. Form. with values, but without changes", () => {
		const form = new Form();
		form.setValues({
			name: "Jenesius"
		})
		expect(form.changes).toEqual({})
	})

	test("Object with one fields. Form with changes", () => {
		const form = new Form();
		form.change({
			name: "Jenesius"
		})

		expect(form.changes).toEqual({
			name: "Jenesius"
		})
	})

	test("Plain object should be granted", () => {
		const form = new Form();
		form.change({
			"address.city": "Toronto"
		})
		expect(form.changes).toEqual({
			address: {city: 'Toronto'}
		})
	})


})