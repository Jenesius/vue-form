import {onUnmounted, reactive} from "vue";
import Input from "../classes/Input";
import debug from "../debug/debug";
import copyObject from "../utils/copy-object";

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
		errors: string[],
		changed: boolean
	}>({
		value: input.value,
		disabled: input.disabled,
		errors: [],
		changed: input.changed
	})

	/**
	 * @description setTimeout used for wait short time after values will be marked like changed inside Form.
	 * */
	function updateChanged() {
		setTimeout(() => {
			state.changed = input.changed;
		}, 0)
	}

	const controls = {
		change: (v:any) => {
			debug.msg(`New FormField(${input.name}) Value`, v);
			state.value = (Object.isFrozen(v)) ? v :copyObject(v);
			updateChanged();
		},
		setValues(v: any) {
			debug.msg(`New FormField(${input.name}) Value`, v);
			state.value = (Object.isFrozen(v)) ? v :copyObject(v);
			updateChanged();
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
		if (!input.parentForm) debug.msg(`input:${name}`, `Can't found parent form.`)
		off = input.parentForm?.dependInput(name, controls);
	}

	return {
		state,
		updateName
	};
}
