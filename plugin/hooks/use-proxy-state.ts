import {onUnmounted} from "vue";
import FormProxy from "../classes/FormProxy";
import FormErrors from "../classes/FormErrors";

/**
 * @deprecated
 * */
export default function useProxyState(name: string) {
	
	if (!name) throw FormErrors.ProxyFormWithoutName();
	
	const form = new FormProxy({name});
	
	onUnmounted(() => {
		form.parentForm?.unsubscribe(form);
	})
	
	return {
		form
	}
}
