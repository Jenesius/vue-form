import {Form} from "../classes/Form";
import {reactive} from "vue";

export default function useFormState(form: Form) {
	
	const state = reactive({
		disabled: form.disabled,
	});
	
	form.on(Form.EVENT_DISABLED_UPDATE, () => {
		state.disabled = form.disabled;
	})
	
	return state;
}
