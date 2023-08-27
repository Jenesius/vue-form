import {defineComponent} from "vue";
import {FormField, Form, STORE} from "../../../src/index";
import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "./../components/EmptyApp.vue";


const name = 'description';
function defineTextareaComponent() {
	return defineComponent({

		template: `<div><form-field type = "textarea" placeholder = "Desc" name = "${name}" label = "Info" required autofocus /></div>`,
		components: {FormField}
	})
}
function defaultMount(component = defineTextareaComponent()) {
	return mount(EmptyApp, {
		slots: {
			default: component
		},
		attachTo: document.body
	})
}

describe("Input Password", () => {
	let app: VueWrapper<any>
	let form: Form
	let input: Omit<DOMWrapper<HTMLTextAreaElement>, "exists">

	beforeEach(() => {
		app = defaultMount();
		form = (app.vm as any).form
		input = app.get('textarea');
	})

	test("Label должно отображаться", async () => {
		expect(app.text()).toBe("Info")
	})
	test("По умолчанию поле должно быть пустым", async () => {
		expect(input.element.value).toBe("")
	})
	test("Placeholder должен отображаться", async () => {
		expect(input.element.placeholder).toBe("Desc")
	})
	test("Изменение поле меняет значение в форме", async () => {
		const text = "Information about jenesius"
		await input.setValue(text);
		expect(form.getValueByName(name)).toBe(text)
	})
	test("Изменение форме меняет значение поля", async () => {
		const text = "Good news."
		form.setValues({[name]: text});
		await app.vm.$nextTick()

		expect(input.element.value).toBe(text);
	})
	test("При блокировании поля, ввод невозможен", async () => {
		form.disable()
		await app.vm.$nextTick();
		const text = "Information about jenesius"
		await input.setValue(text);
		await app.vm.$nextTick()
		expect(form.getValueByName(name)).toBe(undefined)
	})
	test("При блокировании поля меняет стилистика", async () => {
		expect(app.find(".input-textarea:disabled").exists()).toBe(false)
		form.disable()
		await app.vm.$nextTick();
		expect(app.find(".input-textarea:disabled").exists()).toBe(true)
	})
	test("При ошибке валидации добавляются текстовые ошибки", async () => {
		expect(app.find('.input-textarea_error').exists()).toBe(false)
		form.validate()
		await app.vm.$nextTick();
		expect(app.text()).toBe("Info" + STORE.requiredMessage);
		expect(app.find('.input-textarea_error').exists()).toBe(true)
	})

})