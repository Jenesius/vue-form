import {inject} from "vue";
import {Form} from "../classes/Form";
import {InputInterface} from "../classes/Input";

export default function buildDepend(name: string, init: () => Form | InputInterface) {
	const parentForm = inject(Form.PROVIDE_NAME) as Form;

	return parentForm.restoreDependence(name) as Form || (() => {
		const d = init();
		parentForm.depend(d);
		return d
	})();
}
