import Form from "../../../src/classes/Form";

describe("Check name for changed status", () => {

	test("After execute change status of changed input must be true", () => {
		const form = new Form();

		const input_1 = new Form({name: 'name'});
		const input_2 = new Form({name: 'login'});

		form.subscribe(input_1);
		form.subscribe(input_2);

		form.change({
			name: "Jenesius"
		})

		expect(form.checkFieldChange(input_1.name as string)).toBe(true)
		expect(form.checkFieldChange(input_2.name as string)).toBe(false)
	})

})