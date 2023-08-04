import Form from "../../../src/classes/Form";

describe("Form.getValueByName", () => {
	test("Undefined name", () => {
		const form = new Form();

		expect(form.getValueByName("name")).toBe(undefined)
		expect(form.getValueByName("address.city.name.a.b.c.d")).toBe(undefined)

	})
	test("Simple value", () => {
		const form = new Form();
		form.setValues({
			name: "Jack"
		})
		expect(form.getValueByName("name")).toBe("Jack")
	})
	test("Multiline value", () => {
		const form = new Form();
		form.setValues({
			address: {
				country: {
					name: "German"
				},
				city: {
					name: "Berlin"
				},
				coordinate: {
					x: 1,
					y: 1
				}
			}
		})
		expect(form.getValueByName("address.coordinate")).toEqual({x: 1, y: 1})

	})
	test("Get value after change", () => {
		const form = new Form();
		form.change({name: "Jack"})
		expect(form.getValueByName('name')).toBe("Jack")
	})

})