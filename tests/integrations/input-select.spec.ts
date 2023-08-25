import {defineComponent} from "vue";
import {InputField, Form} from "./../../src/index";
import {mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "./components/EmptyApp.vue";
import wait from "../wait";

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

function defineSelectComponent(options: any = defaultOptions) {
	return defineComponent({
		data: () => ({
			options
		}),
		template: '<div><input-field type = "select" name = "color" :options = "options" required /></div>',
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

	test("Должно отображаться соответсвующее значение(label)", async () => {
		const app = defaultMount() as VueWrapper<any>
		const form = app.vm.form as Form

		expect(app.text()).toBe("");
		form.setValues({
			color: 'r'
		})
		await app.vm.$nextTick()
		expect(app.text()).toBe("Red");

	})
	test("Открытие списка выборки по нажатию на иконку", async () => {
		const app = defaultMount() as VueWrapper<any>
		const form = app.vm.form as Form

		const button = app.find('.container-input-select-current');
		expect(button.exists()).toBe(true);
		await button.trigger('click');
		expect(app.text()).toBe(defaultOptions.map(a => a.label).join(''))
	})
	test("Открытие списка выборки по нажатию enter при фокусе на поле", async () => {
		const app = defaultMount() as VueWrapper<any>
		const form = app.vm.form as Form

		await app.get('.input-select').trigger('keyup.enter');
		await wait(12)
		expect(app.text()).toBe(defaultOptions.map(a => a.label).join(''))
	})
	test("Переключение значений при нажатии клавиши вниз при фокусе на поле.", async () => {
		const app = defaultMount() as VueWrapper<any>
		const form = app.vm.form as Form

		function triggerDown() {
			return app.get('.input-select').trigger('keydown', {code: "ArrowDown"});
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
		const app = defaultMount(defineSelectComponent(
			Array.from({length:100})
			.map((item, value) => ({
				value,
				label: value.toString()
			}))
		)) as VueWrapper<any>
		const form = app.vm.form as Form

		expect(app.text()).toBe("");
		form.setValues({
			color: 50
		})
		await app.get('.input-select').trigger('keyup.enter');
		const active = app.get('.input-select-option-list-item_active');

		expect(active.text()).toBe("50");
		expect(active.isVisible()).toBe(true)
	})

	test("Disabled select", async () => {
		const app = defaultMount() as VueWrapper<any>
		const form = app.vm.form as Form

		form.disable()
		await app.vm.$nextTick()
		expect(app.find('.input-select_disabled').exists()).toBe(true)

		function triggerDown() {
			return app.get('.input-select').trigger('keydown', {code: "ArrowDown"});
		}

		await triggerDown()
		expect(form.getValueByName('color')).toBe(undefined)


	})

	test("Error Select", async () => {
		const app = defaultMount() as VueWrapper<any>
		const form = app.vm.form as Form

		expect(form.validate()).toBe(false);
		await app.vm.$nextTick()
		expect(app.find('.input-select_error').exists()).toBe(true)
	})

	test("Передача объекта как options", async () => {
		const options = {
			cool: "ts",
			good: "js",
			notBad: "css",
			sad: "html"
		}
		const app = defaultMount(defineSelectComponent(options)) as VueWrapper<any>
		const form = app.vm.form as Form

		expect(app.text()).toBe("");

		await app.get('.input-select').trigger('keyup.enter');

		expect(app.text()).toBe(Object.values(options).join(''));
	})
})