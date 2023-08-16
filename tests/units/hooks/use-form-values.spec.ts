import Form from "../../../src/classes/Form";
import useFormValues from "../../../src/hooks/use-form-values";

describe("Use Form Values", () => {

	test("By default is empty", () => {
		const form = new Form();
		const values = useFormValues(form);

		expect(values).toEqual({})
	})

	test("After change is should be updated", () => {
		const form = new Form();
		const values = useFormValues(form);

		expect(values).toEqual({})
		form.change({
			name: "Jenesius"
		})
		expect(values).toEqual({
			name: "Jenesius"
		})
	})
	test("After setValues is should be updated", () => {
		const form = new Form();
		const values = useFormValues(form);

		expect(values).toEqual({})
		form.change({
			age: 24
		})
		expect(values).toEqual({
			age: 24
		})
	})
	test("After multi setValues is should be updated", () => {
		const form = new Form();
		const values = useFormValues(form);

		expect(values).toEqual({})
		form.change({
			age: 24
		})
		expect(values).toEqual({
			age: 24
		})
		form.change({
			name: "Jack"
		})
		expect(values).toEqual({
			age: 24,
			name: "Jack"
		})
		form.change({
			height: 176
		})
		expect(values).toEqual({
			age: 24,
			name: "Jack",
			height: 176,
		})
		form.change({
			gender: "M"
		})
		expect(values).toEqual({
			age: 24,
			name: "Jack",
			height: 176,
			gender: "M"
		})
	})

})