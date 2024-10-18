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
	
	test("Autonomic form: children changes should update status of parent form", () => {
		const parent = new Form()
		const child = new Form({
			parent,
			name: "test",
			autonomic: true
		})
		
		const parentState = useFormState(parent);
		const childState = useFormState(parent);
		
		expect(parent.changed).toBe(false);
		expect(child.changed).toBe(false);

		child.change({
			age: 18
		})
		
		expect(parentState.changed).toBe(true);
		expect(childState.changed).toBe(true);
	})
	
	test("", () => {
		const grandParent = new Form({name: '0'})
		const parent = new Form({name: '1', parent: grandParent})
		const child = new Form({name: '2', parent, autonomic: true})
		
		const grandParentState = useFormState(grandParent)
		const parentState = useFormState(parent)
		const childState = useFormState(child)
		
		child.change({name: 'Jack'})
		
		expect(grandParent.changed).toBe(true)
		expect(parent.changed).toBe(true)
		expect(child.changed).toBe(true)
		
		expect(grandParentState.changed).toBe(true)
		expect(parentState.changed).toBe(true)
		expect(childState.changed).toBe(true)
		
	})
	
})