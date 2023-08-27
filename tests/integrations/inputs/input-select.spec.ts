import {defineComponent} from "vue";
import {InputField, Form} from "../../../src/index";
import STORE from "../../../src/config/store";
import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "../components/EmptyApp.vue";
import wait from "../../wait";

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
const name = 'color'
const label = "Select color";
function defineSelectComponent(props:any = { options: defaultOptions }) {
	return defineComponent({
		data: () => ({
			propsValues: props,
		}),
		template: `<div><input-field v-bind = "propsValues"   type = "select" name = "${name}"  required /></div>`,
		components: {InputField}
	})
}
function defaultMount(component = defineSelectComponent()) {
	return mount(EmptyApp, {
		slots: {
			default: component
		},
		attachTo: document.body
	})
}

describe("Input Select Testing", () => {

	let app: VueWrapper
	let form: Form
	let currentItem: DOMWrapper<HTMLElement>
	let input: DOMWrapper<HTMLElement>

	beforeEach(() => {
		app = defaultMount();
		form = (app.vm as any).form
		input = app.find('.input-select')
		currentItem = app.find('.container-input-select-current')
	})

	test("Label должно отображаться", async () => {
		const app = defaultMount(defineSelectComponent({label}))
		expect(app.text()).toBe(label)
	})
	test("Placeholder должно отображаться", async () => {
		const app = defaultMount(defineSelectComponent({
			placeholder: "Array of colors"
		}))

		expect(app.text()).toBe("Array of colors")
	})
	test("По умолчанию значение пустое", async () => {
		expect(currentItem.text()).toBe("")
	})

	test("Должно отображаться соответсвующее значение(label)", async () => {
		expect(app.text()).toBe('');
		form.setValues({
			[name]: defaultOptions[0].value
		})
		await app.vm.$nextTick()
		await wait(233)
		console.log(app.html())
		expect(app.text()).toBe(defaultOptions[0].label);
	})
	test("Открытие списка выборки по нажатию на иконку", async () => {
		expect(currentItem.exists()).toBe(true);
		await currentItem.trigger('click');
		expect(app.text()).toBe(defaultOptions.map(a => a.label).join(''))
	})
	test("Открытие списка выборки по нажатию enter при фокусе на поле", async () => {
		await app.get('.input-select').trigger('keyup.enter');
		expect(app.text()).toBe(defaultOptions.map(a => a.label).join(''))
	})
	test("Открытие списка выборки по нажатию space при фокусе на поле", async () => {
		await app.get('.input-select').trigger('keyup.space');
		expect(app.text()).toBe(defaultOptions.map(a => a.label).join(''))
	})
	test("Переключение значений при нажатии клавиши вниз при фокусе на поле.", async () => {
		function triggerDown() {
			return app.get('.input-select').trigger('keydown.down');
		}

		await triggerDown()
		expect(form.getValueByName('color')).toBe(defaultOptions[0].value)
		await triggerDown()
		expect(form.getValueByName('color')).toBe(defaultOptions[1].value)
		await triggerDown()
		expect(form.getValueByName('color')).toBe(defaultOptions[2].value)
		await triggerDown()
		expect(form.getValueByName('color')).toBe(defaultOptions[0].value)
	})
	test("При открытии поля значение должно быть в видимой части.", async () => {
		const app = defaultMount(defineSelectComponent({
			options:
				Array.from({length:100})
				.map((item, value) => ({
					value,
					label: value.toString()
				}))

		})) as VueWrapper<any>
		const form = app.vm.form as Form

		expect(app.text()).toBe('');
		form.setValues({
			color: 50
		})

		await app.get('.input-select').trigger('keyup.enter');
		const active = app.get('.input-select-option-list-item_active');

		expect(active.text()).toBe("50");
		expect(active.isVisible()).toBe(true)
	})
	test("При передаче hiddenValues, список должен быть отфильтрован", async () => {

		const hiddenValues = [defaultOptions[0].value];
		const app = defaultMount(defineSelectComponent({
			hiddenValues,
			options: defaultOptions
		})) as VueWrapper<any>

		await app.get('.input-select').trigger('keyup.enter');

		expect(app.text()).toBe(Object.values(
			defaultOptions.filter(item => !hiddenValues.includes(item.value)).map(a => a.label)
		).join(''));
	})

	test("Disabled select", async () => {

		form.disable()
		await app.vm.$nextTick()
		expect(app.find('.input-select_disabled').exists()).toBe(true)

		function triggerDown() {
			return app.get('.input-select').trigger('keydown.down');
		}

		await triggerDown()
		expect(form.getValueByName('color')).toBe(undefined)
	})

	test("Error Select", async () => {
		expect(form.validate()).toBe(false);
		await app.vm.$nextTick()
		expect(app.find('.input-select_error').exists()).toBe(true)
		expect(app.text()).toBe(STORE.requiredMessage)
	})

	test("Передача объекта как options", async () => {
		const options = {
			cool: "ts",
			good: "js",
			notBad: "css",
			sad: "html"
		}
		const app = defaultMount(defineSelectComponent({
			options
		})) as VueWrapper<any>

		expect(app.text()).toBe('');

		await app.get('.input-select').trigger('keyup.enter');

		expect(app.text()).toBe(Object.values(options).join(''));
	})

	test("Tabindex check", async () => {
		expect(input.element.getAttribute('tabindex')).toBe("0")
	})
	test("Press down should change value", async () => {
		await input.trigger('keydown.down');
		expect(form.getValueByName(name)).toBe(defaultOptions[0].value)

		await input.trigger('keydown.down');
		expect(form.getValueByName(name)).toBe(defaultOptions[1].value)
	})
	test("Press up should change value", async () => {
		await input.trigger('keydown.up');
		expect(form.getValueByName(name)).toBe(defaultOptions[2].value)
	})
	test("Press up and down not work in disabled status", async () => {
		form.disable()
		await app.vm.$nextTick();
		expect(input.element.getAttribute('tabindex')).toBe("none")
	})
})