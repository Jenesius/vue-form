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
		await app.get('.input-select').trigger('keydown.space');
		expect(app.text()).toBe(defaultOptions.map(a => a.label).join(''))
	})
	test("Переключение значений при нажатии клавиши вниз при фокусе на поле.", async () => {
		function triggerDown() {
			return app.get('.input-select').trigger('keydown', {key: "ArrowDown"});
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
		expect(app.find('.vf-input-select_disabled').exists()).toBe(true)

		function triggerDown() {
			return app.get('.input-select').trigger('keydown.down');
		}

		await triggerDown()
		expect(form.getValueByName('color')).toBe(undefined)
	})

	test("Error Select", async () => {
		expect(form.validate()).toBe(false);
		await app.vm.$nextTick()
		expect(app.find('.vf-input-select_error').exists()).toBe(true)
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
		await input.trigger('keydown', {key: "ArrowDown"});
		expect(form.getValueByName(name)).toBe(defaultOptions[0].value)

		await input.trigger('keydown', {key: "ArrowDown"});
		expect(form.getValueByName(name)).toBe(defaultOptions[1].value)
	})
	test("Press up should change value", async () => {
		await input.trigger('keydown', {key: "ArrowUp"});
		expect(form.getValueByName(name)).toBe(defaultOptions[2].value)
	})
	test("Press up and down not work in disabled status", async () => {
		form.disable()
		await app.vm.$nextTick();
		expect(input.element.getAttribute('tabindex')).toBe("none")
	})

	test("Multiple attr should show first selected item as title", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions
		}))
		const form = (wrap.vm as any).form;
		form.setValues({
			[name]: [defaultOptions[0].value]
		})
		await wrap.vm.$nextTick();
		expect(wrap.text()).toBe(defaultOptions[0].label);
	})
	test("Multiple attr should show first selected item + N as title if was selected more then one", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions
		}))
		const form = (wrap.vm as any).form;
		form.setValues({
			[name]: defaultOptions.map(i => i.value)
		})
		await wrap.vm.$nextTick();
		expect(wrap.text()).toBe(defaultOptions[0].label + ' + ' + (defaultOptions.length - 1));
	})

	test("Multiple attr should show selected items", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions
		}))
		const form = (wrap.vm as any).form as Form;
		form.setValues({
			[name]: [defaultOptions[1].value]
		})
		currentItem = wrap.find('.container-input-select-current')
		expect(currentItem.exists()).toBe(true);
		await currentItem.trigger('click');

		expect(wrap.findAll('.input-select-option-list-item_active').map(item => item.text())).toEqual([defaultOptions[1].label])
	})
	test("Selecting items should update value(multiple attr", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions
		}))
		const form = (wrap.vm as any).form as Form;
		currentItem = wrap.find('.container-input-select-current')
		await currentItem.trigger('click');

		await wrap.findAll('.input-select-option-list-item').reduce((acc, item) => {
			return acc.then(() => item.trigger('click'))
		}, Promise.resolve())

		expect(form.getValueByName(name)).toEqual(defaultOptions.map(item => item.value))

		await wrap.findAll('.input-select-option-list-item').reduce((acc, item) => {
			return acc.then(() => item.trigger('click'))
		}, Promise.resolve())

		expect(form.getValueByName(name)).toEqual([])
	})

	test("Using limit should reject selecting more then provided in limit attr.", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions,
			limit: 2
		}))
		const form = (wrap.vm as any).form as Form;
		currentItem = wrap.find('.container-input-select-current')
		await currentItem.trigger('click');

		await wrap.findAll('.input-select-option-list-item').reduce((acc, item) => {
			return acc.then(() => item.trigger('click'))
		}, Promise.resolve())

		expect(form.getValueByName(name)).toEqual(defaultOptions.map(item => item.value).slice(0, 2))
	})

	test("Shift + ArrowDown: _ -> 0 = _, 1", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions,
			limit: 2
		}))
		const form = (wrap.vm as any).form as Form;
		currentItem = wrap.find('.container-input-select-current')
		await currentItem.trigger('keydown.shift.down');

		expect(form.getValueByName(name)).toEqual([defaultOptions[0].value]);
	})
	test("Shift + ArrowDown: 1 -> 0 = 1, 1", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions,
		}))
		const form = (wrap.vm as any).form as Form;
		form.setValues({
			[name]: [defaultOptions[1].value]
		})
		await app.vm.$nextTick()
		await wrap.find('.container-input-select-current').trigger('click');
		currentItem = wrap.find('.container-input-select-current')
		await currentItem.trigger('keydown.shift', {
			key: "ArrowDown"
		});

		expect(form.getValueByName(name)).toEqual([defaultOptions[1].value, defaultOptions[2].value]);
	})
	test("Shift + ArrowDown: 0 -> 1 = 0, 0", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions,
		}))
		const form = (wrap.vm as any).form as Form;
		form.setValues({
			[name]: [defaultOptions[1].value]
		})
		await app.vm.$nextTick()
		await wrap.find('.container-input-select-current').trigger('click');
		currentItem = wrap.find('.container-input-select-current')

		await currentItem.trigger('keydown.ctrl', { key: "ArrowUp" })
		await currentItem.trigger('keydown.shift', {
			key: "ArrowDown"
		});

		expect(form.getValueByName(name)).toEqual([]);
	})
	test("Shift + ArrowDown: 0 -> 0 = 1, 0", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions,
		}))
		const form = (wrap.vm as any).form as Form;
		await wrap.find('.container-input-select-current').trigger('click');
		currentItem = wrap.find('.container-input-select-current')

		await currentItem.trigger('keydown.ctrl', { key: "ArrowDown" })
		await currentItem.trigger('keydown.shift', {
			key: "ArrowDown"
		});
		expect(form.getValueByName(name)).toEqual([defaultOptions[0].value]);
		await currentItem.trigger('keydown.shift', {
			key: "ArrowDown"
		});
		expect(form.getValueByName(name)).toEqual([defaultOptions[0].value, defaultOptions[1].value]);
	})
	test("Shift + ArrowDown: 1 -> 1 = 0, 1", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions,
		}))
		const form = (wrap.vm as any).form as Form;
		await wrap.find('.container-input-select-current').trigger('click');
		currentItem = wrap.find('.container-input-select-current')

		await currentItem.trigger('keydown.shift', { key: "ArrowDown" });
		await currentItem.trigger('keydown.shift', { key: "ArrowDown" });

		await currentItem.trigger('keydown.ctrl', { key: "ArrowUp" });

		expect(form.getValueByName(name)).toEqual([defaultOptions[0].value, defaultOptions[1].value]);
		await currentItem.trigger('keydown.shift', { key: "ArrowDown" });
		expect(form.getValueByName(name)).toEqual([defaultOptions[1].value]);
	})

	test("Double SPACE press should not make effect for multiple", async () => {
		const wrap = defaultMount(defineSelectComponent({
			multiple: true,
			options: defaultOptions,
			limit: 2
		}))
		const form = (wrap.vm as any).form as Form;
		form.setValues({
			[name]: []
		})
		currentItem = wrap.find('.container-input-select-current')
		await currentItem.trigger('keydown.space');
		await currentItem.trigger('keydown.space');
		expect(form.getValueByName(name).length).toBe(0)
	})
})