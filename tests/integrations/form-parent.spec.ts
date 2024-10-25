import {mount} from "@vue/test-utils";
import Form from "./../../src/classes/Form";
import AppSubscribe from "./components/AppSubscribe.vue";
import AppWithoutSubscribe from "./components/AppWithoutSubscribe.vue";

describe("Parent Form", () => {
	
	test('with parent', () => {
		const app = mount(AppSubscribe) as any;
		const form = app.vm.form as Form;

		
		expect(form.dependencies.length).toBe(1)
	})
	
	test('WithoutParent', () => {
		const app = mount(AppWithoutSubscribe) as any;
		const form = app.vm.form as Form;
		
		
		expect(form.dependencies.length).toBe(0)
	})
})