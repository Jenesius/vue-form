import {inject} from "vue";
import {Form} from "../classes/Form";
import {Input, InputInterface} from "../classes/Input";

export default function buildDepend(name: string, init: () => Form | InputInterface | Input):any {
	const parentForm = inject(Form.PROVIDE_NAME) as Form;

	return parentForm.restoreDependence(name) || (() => {
		const d = init();
		parentForm.depend(d);
		return d
	})();
}
