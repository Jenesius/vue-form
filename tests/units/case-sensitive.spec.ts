import {config, InputField, STORE} from "../../src/index";
import {mount} from "@vue/test-utils";
import {defineComponent} from "vue";

describe("Case Sensitive", () => {
	test("By default it should set to true", () => {
		expect(STORE.typeNotCaseSensitive).toEqual(true);
	})
	test("After set false, the typeNotCaseSensitive must be false", () => {
		config({
			typeNotCaseSensitive: false
		})
		expect(STORE.typeNotCaseSensitive).toEqual(false)
	})
	test("Using input-field without Form, don't reject the error", async () => {
		const template = 'information'
		const info = defineComponent({template})
		config({
			inputTypes: {info}
		})
		const wrap = () => mount(defineComponent({
			template:
				`
					<div>
					<input-field name="data" type = "info"/>
					</div>`,
			components: {InputField}
		}))
		
		expect(wrap).not.toThrow();
		expect(wrap().text()).toBe(template)
	})
	/**
	 * @description Diffrence between two next test: first test check that Type provided to InputField will be converted
	 * to lowercase. The second test check that type provided in the store will be converted to lowercase.
	 * */
	test("Case names(just in lowercase) must return the same component after rendering", async () => {
		const text = 'information';
		const component = defineComponent({
			template: `${text}`
		})
		config({
			inputTypes: {
				'info': component,
			},
			typeNotCaseSensitive: true
		})

		const wrap = await mount(defineComponent({
			template:
				`<div>
					<input-field type = "info" name = "a"/>
					<input-field type = "InFO" name = "c" />
				</div>`,
			components: {InputField}
		}))

		expect(wrap.text()).toBe([0,0].map(() => text).join(''))
	})

	test("Case names must return the same component after rendering", async () => {
		const text = 'test-component';
		const component = defineComponent({
			template: `${text}`
		})
		config({
			inputTypes: {
				'Test': component,
			},
			typeNotCaseSensitive: true
		})

		const wrap = await mount(defineComponent({
			template:
				`<div>
					<input-field type = "test" name = "a"/>
					<input-field type = "Test" name = "b"/>
					<input-field type = "TEST" name = "c" />
				</div>`,
			components: {InputField}
		}))

		expect(wrap.text()).toBe([0,0,0].map(() => text).join(''))
	})
})