import {onUnmounted, reactive, watch} from "vue";
import Input from "../classes/Input";

export default function useInputState(name: string, validation: any[] = []) {
	
	const input = new Input({name, validation});
	const {state, updateName} = useInputController(input);

	return {
		state,
		updateName,
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
		setValues(v: any) {
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

	let off:any; // Off handle for unsubscribe input from FORM.

	updateName(input.name)

	onUnmounted(() => {
		if (off) {
			off();
		}
	})

	/**
	 * @description method for updating name of input in real-time.
	 * Using with Dynamic :name = "test", test = ref()
	 * */
	function updateName(name: string) {
		off?.();
		input.name = name;
		off = input.parentForm?.dependInput(name, controls);
	}

	return {
		state,
		updateName
	};
}
