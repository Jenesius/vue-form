import {inject, onUnmounted, reactive} from "vue";
import Form from "../classes/Form";

export default function useInputState(name: string, validation: []) {
	const parentForm = inject(Form.PROVIDE_NAME) as Form;
	
	const state = reactive({
		value: parentForm.getValueByName(name),
		disabled: parentForm.getDisabledByName(name),
		errors: []
	})
	
	
	const controls = {
		change: (v:any) => {
			state.value = v;
		},
		disable: () => {
			state.disabled = true;
		},
		enable: () => {
			state.disabled = false;
		},
		hide: () => {},
		show: () => {},
		validate: () => {
		
		},
		focus: () => {}
	}
	
	const off = parentForm.dependInput(name, controls)
	onUnmounted(() => {
		off();
	})
	
	/**
	 * Предоставляется фронтенду, презентейшен view.
	 * */
	return {
		state,
		input: {
			change: (v:any) => {
				parentForm.input(name, v);
			},
		}
	}
}
