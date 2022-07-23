/**
 * Current test shouldn't test grandObject function, current case was checked in other test modules.
 * */
import Form from "../../plugin/classes/Form";

describe("Form.setValues", () => {

	test("Simple values", () => {
		const form = new Form();
		form.setValues({
			"address.city": "Berlin"
		})
		expect(form.values).toEqual({
			address: { city: "Berlin" }
		})
	})
	test("Milty set values", () => {
		const form = new Form();
		form.setValues({ name: "Jack" })
		form.setValues({ age: 23 })
		form.setValues({ sex: 'm' })

		expect(form.values).toEqual({
			name: "Jack", age: 23, sex: 'm'
		})
	})
	test("Override values", () => {
		const form = new Form();
		form.setValues({
			address: { city: "Berlin" }
		})
		form.setValues({
			"address.city": "New York"
		})
		expect(form.values).toEqual({
			address: {
				city: "New York"
			}
		})
	})


})