import Form from "../classes/Form";
import {reactive} from "vue";

export default function useFormState(form: Form) {
	const state = reactive<FormReactiveState>({
		changed: form.changed,
		disabled: form.disabled,
		wait: form.wait
	})
	
	// form.on(Form.EVENT_CHANGED, () => state.changed = form.changed);
	form.onavailable(v => state.disabled = v);
	form.on(Form.EVENT_WAIT, v => state.wait = v)

	return state
}
interface FormReactiveState {
	changed: boolean,
	disabled: boolean,
	wait: boolean
}
