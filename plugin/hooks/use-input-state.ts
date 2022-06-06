import {inject, onUnmounted, reactive} from "vue";
import Form from "../classes/Form";

export default function useInputState(name: string) {
	const parentForm = inject(Form.PROVIDE_NAME) as Form;
	
	const state = reactive({
		value: parentForm.getValueByName(name),
		disabled: parentForm.getDisabledByName(name)
	})
	
	const off = parentForm.dependInput(name, {
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
		validate: () => {},
		focus: () => {}
	})
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
