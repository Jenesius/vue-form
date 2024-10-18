import {utils, Form, } from "./../../../src/index";
import FormError from "./../../../src/classes/FormError"
describe("Form Autonomic Values", () => {
	test("Form without installing autonomicValues", () => {
		const form = new Form();
		expect(form.autonomic).toBe(true)
	})
	
	test("Form with installing autonomicValues", () => {
		const form = new Form({
			autonomic: true
		});
		expect(form.autonomic).toBe(true)
	})
	test("Error should be thrown for form with installing autonomicValues without parent", () => {
		expect(() => new Form({ autonomic: false })).toThrow(FormError.AutonomicFormWithoutParent())
	})
	test("1", () => {
		const parentForm = new Form()
		const form = new Form({
			autonomic: true,
			name: 'test',
			parent: parentForm
		});
		expect(form.autonomic).toBe(true)
	})
	test("2", () => {
		const parentForm = new Form()
		
		const form = new Form({
			autonomic: false,
			name: 'test',
			parent: parentForm
		});
		expect(form.autonomic).toBe(false)
	})
	test("3", () => {
		const parentForm = new Form()
		const form = new Form({
			name: 'test',
			parent: parentForm
		});
		expect(form.autonomic).toBe(false)
	})
	test("changed should has effect to parent forms values. But parent should be stay in changed status.", () => {
		const parentForm = new Form();
		const childrenForm = new Form({
			autonomic: true,
			name: "user"
		});
		parentForm.subscribe(childrenForm);
		const FIELD = 'name';
		
		childrenForm.change({
			[FIELD]: "Jack"
		})
		
		// Было добавлное autonomic, тепперь в Form нужно изменить условия
		expect(childrenForm.changed).toBe(true)
		expect(parentForm.changed).toBe(true)
		
		
		expect(parentForm.getValueByName(
			utils.concatName(childrenForm.name, FIELD)
		)).toBe(undefined);
		
		expect(childrenForm.getValueByName(FIELD)).toBe("Jack")
	})
	
})