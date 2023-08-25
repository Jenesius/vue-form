/**
 * Здесь проверяется очистка event из формы после уничтожения поля
 * */
import {FormField, Form, useFormState, useFormValues} from "../../src";
import {mount} from "@vue/test-utils";
import {defineComponent, ref} from "vue";


describe("Clean event handlers", () => {
	test("count of event should be empty when form was created", () => {
		const form = new Form();
		expect(Object.keys(form.events).length).toBe(0)
	})
	test("Add/Remove input should add 2 events and then remove them", async () => {
		const component = defineComponent({
			props: {
				show: {
					type: Boolean
				}
			},
			template: `<div><form-field name = "age" v-if = "show"/></div>`,
			components: {FormField},
			data: () => ({
				form: new Form()
			})
		})

		const app = mount(component, {
			attachTo: document.body
		}) as any

		const form = app.vm.form as  Form

		expect(Object.keys(form.events).length).toBe(0)
		await app.setProps({ show: true })

		expect(Object.keys(form.events).length).toBe(2)
		expect(Object.keys(form.events[Form.getEventValueByName('age')]).length).toBe(1)
		expect(Object.keys(form.events[Form.getEventAvailabilityByName('age')]).length).toBe(1)

		await app.setProps({ show: false })

		expect(Object.keys(form.events[Form.getEventValueByName('age')]).length).toBe(0)
		expect(Object.keys(form.events[Form.getEventAvailabilityByName('age')]).length).toBe(0)

	})
	test("useFormState should clean hooks after component was removed", async () => {

		const ComponentWithHook = defineComponent({
			template: `<div> </div>`,
			setup() {
				const form = Form.getParentForm() as Form;
				const formState = useFormState(form);
			}
		})

		const app = mount({
			props: {
				show: {
					type: Boolean
				}
			},
			template: `<div><ComponentWithHook v-if = "show"/></div>`,
			components: {ComponentWithHook},
			data: () => ({
				form: new Form()
			})
		}, {
			attachTo: document.body
		}) as any

		const form = app.vm.form as Form;

		expect(Object.keys(form.events).length).toBe(0);
		await app.setProps({
			show: true
		})
		expect(Object.keys(form.events).length).toBe(3);

		expect(Object.keys(form.events[Form.EVENT_WAIT]).length).toBe(1);
		expect(Object.keys(form.events[Form.EVENT_CHANGED]).length).toBe(1);
		expect(Object.keys(form.events[Form.EVENT_AVAILABLE]).length).toBe(1);

		await app.setProps({
			show: false
		})
		expect(Object.keys(form.events[Form.EVENT_WAIT]).length).toBe(0);
		expect(Object.keys(form.events[Form.EVENT_CHANGED]).length).toBe(0);
		expect(Object.keys(form.events[Form.EVENT_AVAILABLE]).length).toBe(0);
	})
	test("useFormValues should clean hooks after component was removed", async () => {

		const ComponentWithHook = defineComponent({
			template: `<div> </div>`,
			setup() {
				const form = Form.getParentForm() as Form;
				const values = useFormValues(form);
			}
		})

		const app = mount({
			props: {
				show: {
					type: Boolean
				}
			},
			template: `<div><ComponentWithHook v-if = "show"/></div>`,
			components: {ComponentWithHook},
			data: () => ({
				form: new Form()
			})
		}, {
			attachTo: document.body
		}) as any

		const form = app.vm.form as Form;

		expect(Object.keys(form.events).length).toBe(0);
		await app.setProps({
			show: true
		})
		expect(Object.keys(form.events).length).toBe(1);
		await app.setProps({
			show: false
		})

		expect(form.events[Form.EVENT_VALUE].length).toBe(0);
	})
})