import Form from "../../plugin/classes/Form";
import Input from "../../plugin/classes/Input";

describe("Form subscribe", () => {

	test("Form with one dependencies", () => {
		const form = new Form();
		const input = new Input({
			name: 'Test'
		});

		form.subscribe(input);
		expect(form.dependencies.length).toBe(1);
	})
	test("Should be empty after subscribe and execute returned off function", () => {
		const form = new Form();
		const input = new Input({name: 'test'});
		const unsubscribe = form.subscribe(input)
		unsubscribe();
		expect(form.dependencies.length).toBe(0)
	})
	test("Should be empty after subscribe and unsubscribe", () => {
		const form = new Form();
		const input = new Input({name: 'test'});
		form.subscribe(input);
		form.unsubscribe(input);
		expect(form.dependencies.length).toBe(0);
	})
	test("Unsubscribe first child", () => {
		const form = new Form();
		const inputs = [new Input({name: 'test-1'}), new Input({name: 'test-2'})]
		inputs.forEach(input => form.subscribe(input))
		form.unsubscribe(inputs[0]);
		expect(form.dependencies.length).toBe(1);
		expect(form.dependencies.includes(inputs[1]));
	})
	test("Form event", () => {
		const form = new Form();
		form.on(Form.EVENT_VALUE, v => {
			expect(v).toEqual({name: 'Jack'})
		})
		form.on('value', v => {
			expect(v).toEqual({ name: 'Jack'  })
		})
		form.setValues({
			name: "Jack"
		})

	})


})