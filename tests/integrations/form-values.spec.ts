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
				x: 123
			}
		})
	})
	test("The form must fire the event for each name has been updated.", async () => {
		const app = mount(App) as any;
		const form = app.vm.form;

		await app.get('input[name=x]').setValue('123');

		const mockCoordinate = jest.fn((...args) => args);
		const mockCoordinateX = jest.fn((...args) => args);

		form.oninput('coordinate', mockCoordinate);
		form.oninput('coordinate.x', mockCoordinateX);

		const NEW_X_VALUE = "123"
		form.setValues({
			coordinate: {
				x: NEW_X_VALUE
			}
		})

		expect(mockCoordinate.mock.calls).toHaveLength(1);
		expect(mockCoordinateX.mock.calls).toHaveLength(1);

		expect(mockCoordinateX.mock.calls[0][0]).toBe(undefined);
		expect(mockCoordinateX.mock.calls[0][1]).toBe(NEW_X_VALUE);

		expect(mockCoordinate.mock.calls[0][1]).toBe(undefined);
		expect(mockCoordinate.mock.calls[0][1]).toEqual({
			x: NEW_X_VALUE
		});
	})

	test("The form should update the composite dependency after coordinate-form execute setValues", async () => {

	})
	test("The form should update the composite dependency after parent-form execute setValues", async () => {

	})
})