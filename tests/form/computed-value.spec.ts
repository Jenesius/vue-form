import ComputedValue from "../../plugin/methods/ComputedValue";
import Form from "../../plugin/classes/Form";

describe("ComputedValue of Form", () => {
	test("By default Computed value should be undefined.", () => {
		const form = new Form();
		const test = ComputedValue(form, "test");
		expect(test.value).toBe(undefined);
	})
	test("Computed value should be changed after setValues", () => {
		const form = new Form();
		const test = ComputedValue(form, "test");
		form.setValues({
			test: '123'
		})
		expect(test.value).toBe('123')
	})
	test("Computed value should be changed after setChanges", () => {
		const form = new Form();
		const test = ComputedValue(form, "test");
		form.change({
			test: 1998
		})
		expect(test.value).toBe(1998)
	})
})