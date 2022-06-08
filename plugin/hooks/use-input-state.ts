import {onUnmounted, reactive} from "vue";
import Input from "../classes/Input";

export default function useInputState(name: string, validation: any[] = []) {
	
	const input = new Input({name, validation});
	const state = useInputController(input);

	return {
		state,
		input
	}
}

function useInputController(input: Input) {
	
	const state = reactive<{
		value: any,
		disabled: boolean,
		errors: string[]
	}>({
		value: input.value,
		disabled: input.disabled,
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
			state.errors = input.validate();
			return state.errors.length === 0;
		},
		focus: () => {}
	}
	
	const off = input.parentForm.dependInput(input.name, controls)
	onUnmounted(() => {
		off();
	})
	
	return state;
}
