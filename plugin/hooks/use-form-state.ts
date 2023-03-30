import Form from "../classes/Form";
import {reactive} from "vue";

export default function useFormState(form: Form) {
	const state = reactive<FormReactiveState & {state: FormReactiveState}>({
		changed: form.changed,
		disabled: form.disabled,
		// @ts-ignore
		state: {
			changed: form.changed,
			disabled: form.disabled
		},
		wait: form.wait
	})
	
	form.on(Form.EVENT_CHANGED, () => {
		state.changed = form.changed
		state.state.changed = form.changed
	});
	form.on(Form.EVENT_UPDATE_ABILITY, v => {
		state.disabled = v
		state.state.disabled = v;
	});

	form.on(Form.EVENT_WAIT, v => {
		state.wait = v;
	})



	return state
}
interface FormReactiveState {
	changed: boolean,
	disabled: boolean,
	wait: boolean
}
