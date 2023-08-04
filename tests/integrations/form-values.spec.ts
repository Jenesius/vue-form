import {mount} from "@vue/test-utils";
import App from "./App.vue";
import Form from "./../../src/classes/Form"

function wait(n = 10) {
	return new Promise(resolve => setTimeout(resolve, n))
}

describe("Dynamic form values.", () => {

	test("The form should update the values, after entering data in input.", async () => {
		const app = mount(App) as any;
		const form = app.vm.form;
		await app.get('input').setValue('Jenesius');

		expect(form.values).toEqual({
			username: "Jenesius"
		})
	})
	test("Input should get value from FormModel after mounted.", async () => {
		const app = mount(App) as any;
		const form = app.vm.form as Form;
		const show = app.vm.showFieldAge;

		expect(form.values).toEqual({});

		form.setValues({
			age: "1998"
		})

		expect(form.values).toEqual({
			age: "1998"
		})

		show();
		await wait(50);

		const inputAge = app.find('input[name=age]').element as HTMLInputElement;
		const value = inputAge.value;

		expect(value).toEqual("1998")
	})
	test("The form should update the composite dependency after handle input.", async () => {
		const app = mount(App) as any;
		const form = app.vm.form;

		await app.get('input[name=x]').setValue('123');

		expect(form.values).toEqual({
			coordinate: {
				x: '123'
			}
		})
	})
	
	test('The input must be empty after executing cleanValues.', async () => {
		const app = await mount(App) as any;
		const form = app.vm.form as Form;

		const inputUsername = app.get('input[name=username]');

		await inputUsername.setValue('Jenesius');

		expect(form.values).toEqual({
			username: "Jenesius"
		})
		
		form.cleanValues();
		expect(form.values).toEqual({});

		await wait();

		expect(inputUsername.value).toBe(undefined)

	})


})