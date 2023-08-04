import Form from "../classes/Form";
import {ref} from "vue";
import FormError from "../classes/FormError";
import {Ref} from "vue";


function ComputedValue<T>(name: string): Ref<T>
function ComputedValue<T>(form: Form, name: string): Ref<T>
/**
 * @description Return computed value for provided field name.
 * */
function ComputedValue<T>(form: Form | string, name?: string): Ref<T>{
	if (typeof form === "string") {
		name = form;
		form = Form.getParentForm() as Form;
		if (!form) throw FormError.FormNotFounded();
	}
	if (!name) throw FormError.ComputedValueWithoutName()

	const value = ref(form?.getValueByName(name));

	form?.oninput(name, (x) => {
		value.value = x;
	})

	return value;
}
export default ComputedValue