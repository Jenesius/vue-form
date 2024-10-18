import Form from "../../../src/classes/Form";

describe("Form.changed", () => {

	test("Default form should has changed equal false.", () => {
		const form = new Form();
		expect(form.changed).toBe(false)
	})
	test("Form with set values should has changes in false value", () => {
		const form = new Form();
		form.setValues({name: "Jenesius"});
		expect(form.changed).toBe(false);
	})
	test("Form.changed equal true after executing change", () => {
		const form = new Form();
		form.change({ name: "Jenesius" });
		expect(form.changed).toBe(true);
	})
	test("Form.changed equal false after executing change and cleanChanges", () => {
		const form = new Form();
		form.change({ name: "Jenesius" });
		expect(form.changed).toBe(true);
		form.revert();
		expect(form.changed).toBe(false);
	})
	test("Form.changed equal false with depend element", () => {
		const form = new Form();
		const childrenForm = new Form({
			name: "test"
		});
		form.subscribe(childrenForm);

		expect(form.changed).toBe(false);
		expect(childrenForm.changed).toBe(false);
	})
	test("Form.changed equal true with changed child form", () => {
		const form = new Form();
		const childrenForm = new Form({
			name: "test"
		});
		form.subscribe(childrenForm);

		childrenForm.change({
			name: 'Jenesius-For-Children-Form'
		})
		expect(form.changed).toBe(true);
		expect(childrenForm.changed).toBe(true);
	})
	
	test("Form.changed equal false after children form was changed and cleaning", () => {
		const form = new Form();
		const childrenForm = new Form({
			name: "test"
		});
		form.subscribe(childrenForm);

		childrenForm.change({
			name: 'Jenesius-For-Children-Form'
		})
		childrenForm.revert();
		expect(form.changed).toBe(false);
		expect(childrenForm.changed).toBe(false);
	})
	test("After cleaning one field(if current field is just one changed) form.changed should be false", () => {
		const form = new Form();
		form.change({
			name: "Jenesius"
		})
		form.cleanChangesByField("name");
		expect(form.changed).toBe(false);
	})
	
	test("With three parent", () => {
		const grandParent = new Form({name: 'grand'})
		const parent = new Form({name: 'parent', parent: grandParent})
		const child = new Form({name: 'child', parent: parent})
		
		
		child.change({name: 'Jack'})
		
		console.log(child.values)
		console.log(child.changes)
		console.log(parent.changes)
		console.log(grandParent.changes)
		
		expect(grandParent.changed).toBe(true)
		expect(parent.changed).toBe(true)
		expect(child.changed).toBe(true)
	})

})