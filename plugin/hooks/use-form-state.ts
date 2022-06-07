import Form from "../classes/Form";
import {reactive} from "vue";

export default function useFormState(form: Form) {
	const state = reactive<FormReactiveState>({
		changed: form.changed,
		disabled: form.disabled
	})
	
	form.on(Form.EVENT_CHANGED, v => state.changed = v);
	form.on(Form.EVENT_DISABLED, v => state.disabled = v);
	
	return {
		state
	}
}
interface FormReactiveState {
	changed: boolean,
	disabled: boolean
}
