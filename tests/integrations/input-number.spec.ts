import {defineComponent} from "vue";
import {InputField, Form} from "../../src/index";
import {mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "./components/EmptyApp.vue";
import {FormFieldValidationCallback} from "@/types";

function defineNumberComponent() {
	return defineComponent({
		template: '<div><input-field type = "number" name = "age"/></div>',
		components: {InputField}
	})
}
function defaultMount(component = defineNumberComponent()) {
	return mount(EmptyApp, {
		slots: {
			default: component
		},
		attachTo: document.body
	})
}

describe("Input number",  () => {

	let wrap: VueWrapper<any>;
	beforeEach(() => wrap = defaultMount())

	test("Should display value from Form", async () => {
		const form = wrap.vm.form as Form;
		form.setValues({
			age: 25
		})
		await wrap.vm.$nextTick()
		expect(wrap.find("input").element.value).toBe("25")
	})
	test("Should change form value", async () => {
		const form = wrap.vm.form as Form;
		form.setValues({
			age: 25
		})
		await wrap.vm.$nextTick()
		expect(wrap.find("input").element.value).toBe("25");
		form.setValues({
			age: 26
		})
		await wrap.vm.$nextTick()
		expect(wrap.find("input").element.value).toBe("26");
		form.setValues({
			age: 27
		})
		await wrap.vm.$nextTick()
		expect(wrap.find("input").element.value).toBe("27");
	})
	test("Step Controller Should be hidden if disabled and input should be disabled", async () => {
		const form = wrap.vm.form as Form;
		form.setValues({
			age: 25
		})
		form.disable('age')

		await wrap.vm.$nextTick()
		expect(wrap.find("input").element.disabled).toBe(true);
		expect(wrap.find('.widget-number-step_disabled').exists()).toBe(false);

	})
	test("Click on button should change the value(up arrow/down arrow)", async () => {
		const form = wrap.vm.form as Form;
		form.setValues({
			age: 25
		})

		await wrap.vm.$nextTick()

		const stepUp = wrap.find('.step_up');
		const stepDown = wrap.find('.step_down');

		await stepUp.trigger('click');
		expect(form.values).toEqual({age: 26})
		await stepUp.trigger('click');
		expect(form.values).toEqual({age: 27})

		await stepDown.trigger('click');
		expect(form.values).toEqual({age: 26});
		await stepDown.trigger('click');
		expect(form.values).toEqual({age: 25});
	})
	test("Press up and down should change the value", async () => {
		const form = wrap.vm.form as Form;
		form.setValues({
			age: 25
		})

		await wrap.vm.$nextTick()

		const input = wrap.find("input");
		await input.trigger('keydown.up');
		await input.trigger('keydown.up');

		expect(form.values).toEqual({age: 27})

		await input.trigger('keydown.down');
		expect(form.values).toEqual({age: 26})
	})
	test("If Step was provided it should change onStep", async () => {

		wrap = defaultMount(defineComponent({
			template: '<div><input-field type = "number" name = "age" step = "10"/></div>',
			components: {InputField}
		}))

		const form = wrap.vm.form as Form;
		form.setValues({age: 100});

		await wrap.vm.$nextTick();

		const input = wrap.find("input");
		await input.trigger('keydown.down');
		await input.trigger('keydown.down');
		await input.trigger('keydown.down');

		expect(form.values).toEqual({age: 70})
	})
	test("If suffix was provided it should be displayed", async () => {

		wrap = defaultMount(defineComponent({
			template: '<div><input-field type = "number" name = "age" suffix = "Years"/></div>',
			components: {InputField}
		}))

		await wrap.vm.$nextTick();


		expect(wrap.text()).toBe("Years")
	})
	test("Should show error if validated failed", async () => {

		const test:FormFieldValidationCallback[] = [
			x => (x >= 0 && x < 120) || 'Wrong age'
		];

		wrap = defaultMount(defineComponent({
			template: `<div><input-field type = "number" name = "age"  :validation = "${test}" /></div>`,
			components: {InputField}
		}))
		const form = wrap.vm.form as Form;
		await wrap.vm.$nextTick();

		form.setValues({
			age: -1
		})

		await wrap.vm.$nextTick()
		expect(wrap.find('input').element.value).toBe('-1')
		expect(form.validate()).toBe(false)
		await wrap.vm.$nextTick()
		expect(wrap.find('.container-input-number_error').exists()).toBe(true);
		expect(wrap.text()).toBe('Wrong age')


		form.setValues({
			age: 2
		})
		form.validate()
		await wrap.vm.$nextTick()
		expect(wrap.text()).toBe('')
	})

})