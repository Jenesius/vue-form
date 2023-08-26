import {defineComponent} from "vue";
import {FormField, Form, STORE} from "../../src/index";
import {mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "./components/EmptyApp.vue";

const defaultOptions =  [
	{
		label: "Red",
		value: 'r'
	},
	{
		label: "Green",
		value: 'g'
	},
	{
		label: "Yellow",
		value: 'y'
	}
]
const name = 'color';
function defineCheckboxComponent(options: any = defaultOptions) {
	return defineComponent({
		data: () => ({
			options
		}),
		template: `<div><form-field type = "checkbox" name = "${name}" :options = "options" required /></div>`,
		components: {FormField}
	})
}
function defaultMount(component = defineCheckboxComponent()) {
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

	beforeEach(() => {
		app = defaultMount();
		form = (app.vm as any).form
	})

	test("Должен отображать все Labels", () => {
		expect(app.text()).toBe(defaultOptions.map(item => item.label).join(''))
	})
	test("Если есть активный элемент, должен отображать его", async () => {
		form.setValues({
			[name]: ['y']
		})
		await app.vm.$nextTick()
		expect(app.find('.element-input-checkbox-button_active').exists()).toBe(true)
	})
	test("Click should change value", async () => {
		await app.find('.element-input-checkbox-button').trigger('click');
		expect(form.getValueByName(name)).toEqual(['r'])
	})
	test("Если disabled ввод не должен работать", async () => {

		await app.find('.element-input-checkbox-button').trigger('click');

		form.disable();
		await app.vm.$nextTick()

		const items = app.findAll('.element-input-checkbox-button');

		await items[0].trigger('click');
		await items[1].trigger('click');
		await items[2].trigger('click');

		expect(app.find('.element-input-checkbox-button_disabled').exists()).toBe(true)
		expect(form.getValueByName(name)).toEqual(['r'])
	})
	test("Если disabled то элемент должен быть заблокирован", async () => {
		form.disable();
		await app.vm.$nextTick()
		expect(app.find('.element-input-checkbox-button_disabled').exists()).toBe(true)
	})
	test("Значение должно быть установлено по Enter", async () => {
		await app.find('.element-input-checkbox:nth-child(2)').trigger('keyup.space')
		expect(form.getValueByName(name)).toEqual(['g'])
	})
	test("Значение должно быть установлено по Space", async () => {
		await app.find('.element-input-checkbox:nth-child(2)').trigger('keyup.enter')
		await app.find('.element-input-checkbox:nth-child(3)').trigger('keyup.enter')
		expect(form.getValueByName(name)).toEqual(['g', 'y'])
	})
	test("Error should change the view of checkbox", async () => {
		form.validate();
		await app.vm.$nextTick();
		expect(app.findAll('.element-input-checkbox-button_error').length).toBe(3);
		expect(app.text()).toBe(
			defaultOptions.map(el => el.label).join('') + STORE.requiredMessage
		)
	})
	test("Tabindex should be added for all items", () => {
		const items = app.findAll('.element-input-checkbox')

		expect(items[0].element.getAttribute('tabindex')).toBe('0')
		expect(items[1].element.getAttribute('tabindex')).toBe('0')
		expect(items[2].element.getAttribute('tabindex')).toBe('0')
	})
	test("If checkbox is disabled status tabindex should be ignored", async () => {
		form.disable();
		await app.vm.$nextTick()
		const items = app.findAll('.element-input-checkbox')


		expect(items[0].element.getAttribute('tabindex')).toBe('none')
		expect(items[1].element.getAttribute('tabindex')).toBe('none')
		expect(items[2].element.getAttribute('tabindex')).toBe('none')
	})

})