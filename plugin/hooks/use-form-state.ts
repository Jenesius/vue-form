import Form from "../classes/Form";
import {reactive} from "vue";

export default function useFormState(form: Form) {
	const state = reactive<FormReactiveState & {state: FormReactiveState}>({
		changed: form.changed,
		disabled: form.disabled,
		state: {
			changed: form.changed,
			disabled: form.disabled
		}
	})
	
	form.on(Form.EVENT_CHANGED, () => {
		state.changed = form.changed
		state.state.changed = form.changed
	});
	form.on(Form.EVENT_DISABLED, v => {
		state.disabled = v
		state.state.disabled = v;
	});




	return state
}
interface FormReactiveState {
	changed: boolean,
	disabled: boolean
}
