import {Form} from "../classes/Form";
import {reactive} from "vue";

export default function useFormState(form: Form) {
	
	const state = reactive({
		disabled: form.disabled,
		hidden: form.hidden
	});
	
	if (!form) throw new Error('eee')
	
	form.on(Form.EVENT_DISABLED_UPDATE, () => {
		state.disabled = form.disabled;
	})
	form.on(Form.EVENT_HIDE_UPDATE, () => {
		state.hidden = form.hidden;
	})
	
	return state;
}
