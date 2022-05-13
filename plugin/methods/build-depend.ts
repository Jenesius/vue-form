import {inject} from "vue";
import {Form} from "../classes/Form";

export default function buildDepend(name: string, init: () => Form) {
	const parentForm = inject(Form.PROVIDE_NAME) as Form;
	
	const form = parentForm.restoreDependence(name) as Form || init();
	parentForm.depend(form);
	return form;
}
