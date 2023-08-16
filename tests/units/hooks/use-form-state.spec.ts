import Form from "../../../src/classes/Form";
import useFormState from "../../../src/hooks/use-form-state";

describe("Use form state", () => {
	test("By default disabled equal true", () => {
		const form = new Form();
		const formState = useFormState(form);

		expect(formState.disabled).toBe(false)
	})
	test("After disable/enable it should be updated", () => {
		const form = new Form();
		const formState = useFormState(form);

		expect(formState.disabled).toBe(false)
		form.disable()
		expect(formState.disabled).toBe(true)
		form.enable()
		expect(formState.disabled).toBe(false)
	})

	test("By default changed equal false", () => {
		const form = new Form();
		const formState = useFormState(form);

		expect(formState.changed).toBe(false)
	})
	test("After change/revert it should be updated", () => {})
})