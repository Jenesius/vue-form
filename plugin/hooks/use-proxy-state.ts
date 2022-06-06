import {onUnmounted} from "vue";
import FormProxy from "../classes/FormProxy";

export default function useProxyState(name: string) {
	const form = new FormProxy({name});
	
	onUnmounted(() => {
		form.parentForm?.unsubscribe(form);
	})
	
	return {}
}
