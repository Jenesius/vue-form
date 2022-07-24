import generateFieldByPath from "../../plugin/utils/generate-field-by-path";
import FormErrors from "../../plugin/classes/FormErrors";

describe("Generate field by path", () => {

	test("Simple path", () => {
		expect(generateFieldByPath({}, ["name"], "Jenesius")).toEqual({name: "Jenesius"})
	})
	test("Deepen name", () => {
		expect(generateFieldByPath({}, ["name", "local"], "JNSS")).toEqual({name: { local: "JNSS"}})
	})
	test("Merge field", () => {
		expect(generateFieldByPath({address: {city: "Berlin"}}, ["address", "country"], "German"))
		.toEqual({
			address: {
				city: "Berlin",
				country: "German"
			}
		})
	})
	test("Handle error", () => {
		expect(() => generateFieldByPath({name: "Jenesius"}, ["name", "local"], "JNSS"))
		.toThrow(FormErrors.UnableExtendPrimitive('name'))
	})
	test("Override value", () => {
		expect(generateFieldByPath({name: "Jenesius"}, ["name"], "JNSS"))
		.toEqual({name: "JNSS"})
	})

})