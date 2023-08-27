import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "./../components/EmptyApp.vue";
import {defineComponent} from "vue";
import {FormField, Form} from "./../../../src/index";
import STORE from "../../../src/config/store";
import wait from "../../wait";

const name = "useToken"
const label = "You have token?"
const cssActiveClass = '.input-switch-button_active';
function defineSwitch(props = {}) {
	return defineComponent({
		data: () => ({propsValues: props}),
		template: `<div><form-field v-bind = "propsValues" type = "switch" name = "${name}" label = "${label}" required/></div>`,
		components:  {FormField}
	})
}
function defaultMount(component = defineSwitch()) {
	return mount(EmptyApp, {
		slots: {
			default: component
		},
		attachTo: document.body
	})
}

describe("Input single checkbox", () => {
	let app: VueWrapper<any>
	let form: Form
	let input: DOMWrapper<HTMLElement>
	beforeEach(() => {
		app = defaultMount();
		form = (app.vm as any).form
		input = app.find('.input-switch')
	})

	test("Label должна отображаться", async () => {
		expect(app.text()).toBe(label)
	})
	test("По умолчанию значение виджет должен быть выключенным", async () => {
		expect(app.find(cssActiveClass).exists()).toBe(false)
	})
	test("Изменение виджета - изменяет формы", async () => {
		expect(form.getValueByName(name)).toBe(undefined)
		await input.trigger('click');
		expect(form.getValueByName(name)).toBe(true)
		await input.trigger('click');
		expect(form.getValueByName(name)).toBe(false)
	})
	test("Изменение формы - изменяет виджет", async () => {
		expect(form.getValueByName(name)).toBe(undefined)
		form.setValues({
			[name]: true
		})
		await app.vm.$nextTick()
		expect(app.find(cssActiveClass).exists()).toBe(true)

		form.setValues({
			[name]: false
		})
		await app.vm.$nextTick()
		expect(app.find(cssActiveClass).exists()).toBe(false)
	})

	test("Если передан values, значения выбираются из них", async () => {
		const app = defaultMount(defineSwitch({
			values: ["yes", "no"]
		}))

		const input = app.find('.input-switch')
		const form = (app.vm as any).form;

		await input.trigger('click');
		expect(form.getValueByName(name)).toBe("yes")
		await input.trigger('click');
		expect(form.getValueByName(name)).toBe("no")
		await wait(400)
		expect(app.find(cssActiveClass).exists()).toBe(false)
		form.setValues({
			[name]: 'yes'
		})
		await app.vm.$nextTick()
		expect(app.find(cssActiveClass).exists()).toBe(true)
	})

	test("Нажатие enter изменяет значение", async () => {
		await input.trigger('keyup.enter');
		expect(form.getValueByName(name)).toBe(true)
		await input.trigger('keyup.enter');
		expect(form.getValueByName(name)).toBe(false)
	})
	test("Нажатие Space изменяет значение", async () => {
		await input.trigger('keyup.space');
		expect(form.getValueByName(name)).toBe(true)
		await input.trigger('keyup.space');
		expect(form.getValueByName(name)).toBe(false)
	})

	test("Блокировка поля не даёт установить фокус на поле", async () => {})
	test("Блокировка поля не даёт изменить значение при при помощи нажатия Enter,Space или клику", async () => {
		form.setValues({
			[name]: true
		})
		form.disable();
		await app.vm.$nextTick();

		await input.trigger('keyup.space');
		expect(app.find(cssActiveClass).exists()).toBe(true)
		expect(form.getValueByName(name)).toBe(true)

		await input.trigger('keyup.enter');
		expect(app.find(cssActiveClass).exists()).toBe(true)
		expect(form.getValueByName(name)).toBe(true)

		await input.trigger('click');
		expect(app.find(cssActiveClass).exists()).toBe(true)
		expect(form.getValueByName(name)).toBe(true)
	})
	test("Блокировка поля убирает tabindex", async () => {
		expect(input.element.getAttribute('tabindex')).toBe('0')
		form.disable();
		await app.vm.$nextTick();

		expect(input.element.getAttribute('tabindex')).toBe('none')
	})
	test("Ошибки валидации отображаются на форме", async () => {
		form.validate();
		await app.vm.$nextTick();
		expect(app.text()).toBe(label + STORE.requiredMessage)
		expect(app.find('.vf-input-switch_error').exists()).toBe(true)
	})
})