import Form from "../classes/Form";
import {ref} from "vue";
import FormErrors from "../classes/FormErrors";
import {Ref} from "vue";

function ComputedValue<T>(name: string): Ref<T>
function ComputedValue<T>(form: Form, name: string): Ref<T>
function ComputedValue<T>(form: Form | string, name?: string): Ref<T>{
	if (typeof form === "string") {
		name = form;
		form = Form.getParentForm() as Form;
	}
	if (!name) throw FormErrors.ComputedValueWithoutName()

	const value = ref(form?.getValueByName(name));

	form?.oninput(name, (x) => {
		value.value = x;
	})
	/*
	form?.on(Form.EVENT_VALUE, x => {
		value.value = (form as Form).getValueByName(name as string);
	})*/

	return value;
}
export default ComputedValue