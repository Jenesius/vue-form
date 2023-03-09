import {mount} from "@vue/test-utils";
import FormComponent from "./form-component.vue";
import {Form} from "../../plugin";
import {Ref} from "vue";

function wait(n = 10) {
	return new Promise(resolve => {
		setTimeout(resolve, n)
	})
}

describe("Testing bind modelValue with InputField", () => {
	test("",() => {
		expect(0).toBe(0)
	})
/*
test("ModelValue bidirectional bound to form state", async () => {
	const app = await mount(FormComponent);

	const countries = ['UEF', "UFS"];
	const FIELD_NAME = 'country';

	console.log(app.vm.country);
	const form = app.vm.form;
	form.setValues({
		city: "1"
	})
	await wait(10);
	console.log(form.values, app.vm.city);

})
 */
})