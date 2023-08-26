import {defineComponent} from "vue";
import {InputField, Form} from "../../src/index";
import {DOMWrapper, mount} from "@vue/test-utils";
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
function defineRadioComponent(options: any = defaultOptions) {
	return defineComponent({
		data: () => ({
			options
		}),
		template: `<div><input-field type = "radio" name = "${name}" :options = "options" required /></div>`,
		components: {InputField}
	})
}
function defaultMount(component = defineRadioComponent()) {
	return mount(EmptyApp, {
		slots: {
			default: component
		},
		attachTo: document.body
	})
}

describe("Testing radio button", () => {
	test("Значение устанавливает, как в форме", async () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;

		const selectedItem = defaultOptions[0]

		form.setValues({
			[name]: selectedItem.value
		})
		await app.vm.$nextTick();
		const activeItem = app.find('.element-input-radio_active');
		expect(activeItem.exists()).toBe(true);
		expect(activeItem.text()).toBe(selectedItem.label);
	})
	test("Labels отображаются как часть элемента", () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;

		expect(app.text()).toBe(defaultOptions.map(item => item.label).join(''));
	})
	test("Значение меняется по клику", async () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;

		const radioItems = app.findAll('.element-input-radio');

		expect(radioItems.length).toBe(defaultOptions.length)

		async function checkClickChange(items: DOMWrapper<Element>[], index: number) {
			await items[index].trigger('click');
			expect(form.getValueByName(name)).toBe(defaultOptions[index].value)
		}

		await checkClickChange(radioItems, 1)
		await checkClickChange(radioItems, 2)
		await checkClickChange(radioItems, 0)
	})

	test("Значение меняется по нажатию на стрелки",() => {})
	test("Контейнер должен реагировать на focus", () => {})
	test("Элемент должен реагировать на disabled", () => {})
	test("Элемент должен реагировать на errors", () => {})
})