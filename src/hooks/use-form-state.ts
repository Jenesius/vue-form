import Form from "../classes/Form";
import {onUnmounted, reactive} from "vue";

export default function useFormState(form: Form) {
	const state = reactive<FormReactiveState>({
		changed: form.changed,
		disabled: form.disabled,
		wait: form.wait
	})

	const offArray:any[] = []

	offArray[0] = form.on(Form.EVENT_CHANGED, () => state.changed = form.changed);
	offArray[1] = form.onavailable(v => state.disabled = !v); // Так значение является isAvailable. Значит нам нужно инверсировать его.
	offArray[2] = form.on(Form.EVENT_WAIT, v => state.wait = v)

	onUnmounted(() => {
		offArray.forEach(off => off?.())
	})

	return state
}
interface FormReactiveState {
	changed: boolean,
	disabled: boolean,
	wait: boolean
}
