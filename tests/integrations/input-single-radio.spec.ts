import {mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "./components/EmptyApp.vue";
import {defineComponent} from "vue";
import {FormField, Form} from "./../../src/index";
import STORE from "../../src/config/store";

const name = "color"
function defineSingleRadio() {
	return defineComponent({
		template: `<div><form-field type = "single-radio" name = "${name}" label = "Select color" required/></div>`,
		components:  {FormField}
	})
}
function defaultMount(component = defineSingleRadio()) {
	return mount(EmptyApp, {
		slots: {
			default: component
		},
		attachTo: document.body
	})
}

describe("Input single radio", () => {
	let app: VueWrapper<any>
	let form: Form
	beforeEach(() => {
		app = defaultMount();
		form = (app.vm as any).form
	})

	test("Single radio show display the label", () => {
		expect(app.text()).toBe("Select color")
	})
	test("should change value after click", async () => {
		await app.find('.element-input-radio').trigger('click')
		expect(form.getValueByName(name)).toBe(true)

		await app.find('.element-input-radio').trigger('click')
		expect(form.getValueByName(name)).toBe(false)

		await app.find('.element-input-radio').trigger('click')
		expect(form.getValueByName(name)).toBe(true)
	})
	test("Should show error", async () => {
		form.validate();
		await app.vm.$nextTick()
		expect(app.find('.element-input-radio_error').exists()).toBe(true);
		expect(app.text()).toBe("Select color" + STORE.requiredMessage)
	})
	test("Single radio should not trigger on click when stay in disabled status", async () => {
		form.setValues({
			[name]: true
		})
		form.disable();
		await app.vm.$nextTick()
		expect(app.find('.element-input-radio_disabled').exists()).toBe(true);

		await app.find('.element-input-radio').trigger('click')
		expect(form.getValueByName(name)).toBe(true)
	})

	test("Press space should toggle value", async () => {

		const input = app.find('.element-input-radio');

		await input.trigger('keyup.space')
		expect(form.getValueByName(name)).toBe(true)

		await input.trigger('keyup.space')
		expect(form.getValueByName(name)).toBe(false)

		await input.trigger('keyup.space')
		expect(form.getValueByName(name)).toBe(true)

	})
	test("Press enter should toggle value", async () => {
		const input = app.find('.element-input-radio');

		await input.trigger('keyup.enter')
		expect(form.getValueByName(name)).toBe(true)

		await input.trigger('keyup.enter')
		expect(form.getValueByName(name)).toBe(false)

		await input.trigger('keyup.enter')
		expect(form.getValueByName(name)).toBe(true)
	})
	test("If values was provided, modelValue should be or first or second value", async () => {
		const app = defaultMount(defineComponent({
			template: `<div><form-field 
				type = "single-radio" name = "${name}" label = "Select" required
				:values = "['good', 'bad']"
			/></div>`,
			components:  {FormField}
		}))
		const form = (app.vm as any).form

		const input = app.get('.element-input-radio')

		await input.trigger('click')
		expect(form.getValueByName(name)).toBe("good")

		await input.trigger('click')
		expect(form.getValueByName(name)).toBe("bad")

		await input.trigger('click')
		expect(form.getValueByName(name)).toBe("good")
	})
})