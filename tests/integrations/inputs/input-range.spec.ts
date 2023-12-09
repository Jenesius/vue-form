import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "../components/EmptyApp.vue";
import {defineComponent} from "vue";
import {Form, FormField} from "../../../src/index";
import STORE from "./../../../src/config/store";

const name = 'volume'
const label = `Your ${name}`
function defineRangeComponent(bindProps = {}) {
	return defineComponent({
		data: () => ({bindProps}),
		template: `<div><form-field v-bind = "bindProps" type = "range" name = "${name}" required label = "${label}"/></div>`,
		components: {FormField}
	})
}
function defaultMount(component = defineRangeComponent()) {
	return mount(EmptyApp, {
		slots: { default: component },
		attachTo: document.body
	})
}

describe("Input range", () => {
	let app: VueWrapper<any>;
	let form: Form
	let input: DOMWrapper<HTMLInputElement>
	beforeEach(() => {
		app = defaultMount()
		form = (app.vm as any).form
		input = app.find('input')
	})

	test("Значение поля по умолчанию пустое", async () => {
		expect(input.element.value).toBe("50") // по умолчанию на середине
	})
	test("Для пустого поля должна отображаться только метка", async () => {
		expect(app.text()).toBe(label)
	})
	test("При вводе значения в поле - форма должна меняться", async () => {
		await input.setValue(40)
		expect(form.getValueByName(name)).toBe("40")
	})
	test("При изменении формы - поле должно меняться", async () => {
		form.setValues({[name]: 13});
		await app.vm.$nextTick()
		expect(input.element.value).toBe("13")
	})
	test("Блокировка элемента изменяет его стилистику", async () => {
		form.disable()
		await app.vm.$nextTick()
		expect(input.element.disabled).toBe(true);
	})
	test("Блокировка элемента не даёт ввести значение", async () => {
		await input.setValue(20)
		form.disable()
		await app.vm.$nextTick()
		await input.setValue(40)
		expect(form.getValueByName(name)).toBe("20")
	})
	test("Ошибка валидации отображается на поле", async () => {
		form.validate()
		await app.vm.$nextTick()
		expect(app.text()).toBe(label + STORE.requiredMessage)
	})


	test("Установка max", async () => {
		const app = defaultMount(defineRangeComponent({
			max: 10
		}))
		const input = app.find('input');
		const form = (app.vm as any).form as Form;
		expect(input.element.value).toBe("5");
		await input.setValue(20);
		expect(input.element.value).toBe("10")
		expect(form.getValueByName(name)).toBe("10")
	})
	test("Установка min", async () => {
		const app = defaultMount(defineRangeComponent({
			min: 50
		}))
		const input = app.find('input');
		const form = (app.vm as any).form as Form;
		expect(input.element.value).toBe("75");
		await input.setValue(20);
		expect(input.element.value).toBe("50")
		expect(form.getValueByName(name)).toBe("50")
	})
	test("Установка max/min", async () => {
		const app = defaultMount(defineRangeComponent({
			min: 50, max: 60
		}))
		const input = app.find('input');
		expect(input.element.value).toBe("55");
	})

	/*
	test("Поле должно реагировать на нажатие стрелок", async () =>{
		await input.trigger('keydown.down');
		expect(input.element.value).toBe("49");
		await input.trigger('keydown.down');
		expect(input.element.value).toBe("48");

		await input.trigger('keydown.up');
		expect(input.element.value).toBe("49");
		expect(form.getValueByName(name)).toBe("49")
	})
	test("Установка step", async () => {
		const app = defaultMount(defineRangeComponent({
			step: 15
		}))
		const input = app.find('input');
		await input.trigger('keydown.down');
		expect(input.element.value).toBe("35");
	})
	*/
})