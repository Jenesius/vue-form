import ComputedValue from "../../src/classes/ComputedValue";
import Form from "../../src/classes/Form";

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

	test("Hard computed name", () => {
		const form = new Form();
		const test = ComputedValue(form, "address.name");
		form.change({
			address: {
				city: "1"
			}
		})
		form.setValues({
			address: {
				name: {
					code: 1
				}
			}
		})

		expect(test.value).toEqual({code: 1})
	})
	test("Computed Valued for Child", () => {
		const form = new Form();
		const child = new Form({name: "address"});
		form.subscribe(child)
		form.setValues({
			address: {
				city: "Test"
			}
		})


		const cityValue = ComputedValue(child, "city");
		expect(cityValue.value).toBe("Test")
		form.setValues({
			address: {
				city: "Minsk"
			}
		})
		expect(cityValue.value).toBe("Minsk")

	})
})