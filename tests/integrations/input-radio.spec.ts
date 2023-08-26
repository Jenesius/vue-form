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
	test("Значение меняется по нажатию на стрелки. Вверх/Вниз/ Переход",async () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;

		function triggerKey(this: {items: DOMWrapper<HTMLElement>[]}, index: number, dir: 'up' | 'down') {
			return this.items[index].trigger('keydown.' + dir)	;
		}

		const obj = {
			items: app.findAll<HTMLElement>('.element-input-radio')
		}

		await triggerKey.call(obj, 0, 'down');
		expect(form.getValueByName(name)).toBe('g')

		await triggerKey.call(obj, 1, 'down');
		expect(form.getValueByName(name)).toBe('y')

		await triggerKey.call(obj, 2, 'down');
		expect(form.getValueByName(name)).toBe('r')
	})
	test("Элемент должен быть активным для Tab процессе", async () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;

		const firstItem = app.find<HTMLElement>('.element-input-radio');

		expect(firstItem.element.tabIndex).toBe(0)
	})
	test("Если значение имеется, то tabindex должен быть активный элемент", async () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;
		form.setValues({
			color: defaultOptions[1].value
		})
		await app.vm.$nextTick()

		const items = app.findAll<HTMLElement>('.element-input-radio');

		expect(items[0].element.getAttribute('tabindex')).toBe('none')
		expect(items[1].element.getAttribute('tabindex')).toBe('0')
		expect(items[2].element.getAttribute('tabindex')).toBe('none')
	})
	test("Элемент должен реагировать на disabled", async () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;
		form.disable()
		await app.vm.$nextTick()
	})
	test("Элемент должен реагировать на errors", async () => {
		const app = defaultMount();
		const form = (app.vm as any).form as Form;
		form.validate()
		await app.vm.$nextTick()

		expect(app.findAll('.element-input-radio_error').length).toBe(3)


	})
})