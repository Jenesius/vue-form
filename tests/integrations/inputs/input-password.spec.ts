import {defineComponent} from "vue";
import {FormField, Form, STORE} from "../../../src/index";
import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "./../components/EmptyApp.vue";


const name = 'pass';
function definePasswordComponent() {
	return defineComponent({

		template: `<div><form-field type = "password" name = "${name}" label = "Pass" required autofocus /></div>`,
		components: {FormField}
	})
}
function defaultMount(component = definePasswordComponent()) {
	return mount(EmptyApp, {
		slots: {
			default: component
		},
		attachTo: document.body
	})
}

describe("Input checkbox", () => {
	let app: VueWrapper<any>
	let form: Form
	let input: Omit<DOMWrapper<HTMLInputElement>, "exists">
	let icon :Omit<DOMWrapper<HTMLElement>, "exists">

	beforeEach(() => {
		app = defaultMount();
		form = (app.vm as any).form
		input = app.get('input');
		icon = app.get(".input-password-toggle")
	})

	test("Label должно отображаться", () => {
		expect(app.text()).toBe("Pass")
	})
	test("По умолчанию значение должно быть пустым", async () => {
		expect(input.element.value).toBe("")
	})
	test("При вводе в поле должно меняться состояние формы", async () => {
		await input.setValue("qwerty");
		expect(form.getValueByName(name)).toBe("qwerty")
	})
	test("При изменении состояния формы, должно меняться значение поля", async () => {
		form.setValues({
			[name]: 'admin'
		})
		await app.vm.$nextTick();
		expect(input.element.value).toBe("admin")
	})
	test("При нажатии на иконку меняется видимость поля", async () => {
		expect(input.element.getAttribute('type')).toBe("password")
		await icon.trigger('click');
		expect(input.element.getAttribute('type')).toBe("text")
	})
	test("При нажатии на иконку меняется иконка", async () => {

		const iconComponent = app.findComponent({name: "icon-eye"});

		expect(iconComponent.vm.crossed).toBe(false)
		await icon.trigger('click');
		expect(iconComponent.vm.crossed).toBe(true)
		await icon.trigger('click');
		expect(iconComponent.vm.crossed).toBe(false)
	})

	test("Когда поле заблокировано ввод должен быть не доступен, форма меняться не должна", async () => {
		form.disable()
		await input.setValue("qwerty");
		await app.vm.$nextTick()
		await input.setValue("qwerty123");
		expect(form.getValueByName(name)).toBe("qwerty")
	})
	test("Когда поле заблокировано виджет должен приниматься статус disabled", async () => {
		form.disable()
		await input.setValue("qwerty");

		expect(app.find('.container-input-password_disabled').exists()).toBe(true)
	})
	test("При ошибки валидации должна выводиться ошибка", async () => {
		form.validate();
		await app.vm.$nextTick();
		expect(app.text()).toBe("Pass" + STORE.requiredMessage)
	})

})