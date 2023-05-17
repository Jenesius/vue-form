import {Form, FormProxy} from "../../plugin";

describe("Default test For FormProxy", () => {

	test("Values of parent form should be changed", () => {
		const parentForm = new Form();

		const form = new FormProxy({
			name: "address"
		})
		parentForm.subscribe(form);

		parentForm.setValues({
			name: "jenesius"
		})

		form.change({
			city: "XXX"
		})
		expect(parentForm.values).toEqual({
			address: {
				city: "XXX"
			},
			name: "jenesius"
		})
		expect(parentForm.changes).toEqual({
			address: {
				city: "XXX"
			}
		})
	})
	test("Changed prop must be true after change", () => {
		const parentForm = new Form();

		const form = new FormProxy({
			name: "address"
		})
		parentForm.subscribe(form);

		expect(form.changed).toBe(false);
		expect(parentForm.changed).toBe(false);

		form.change({
			city: "XXX"
		})

		expect(parentForm.changed).toBe(true)
		expect(form.changed).toBe(true);

	})
	/*
	test("New values after setValues", () => {
		const parentForm = new Form();

		const form = new FormProxy({
			name: "address"
		})
		parentForm.subscribe(form);


		form.setValues({
			planet: "Earth"
		})
		expect(parentForm.values).toEqual({
			address: {
				planet: "Earth"
			}
		})
	})*/
})