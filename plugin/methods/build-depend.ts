import {inject} from "vue";
import {FormOld} from "../classes/Form";
import {Input, InputInterface} from "../classes/Input";

export default function buildDepend(name: string, init: () => FormOld | InputInterface | Input):any {
	const parentForm = inject(FormOld.PROVIDE_NAME) as FormOld;

	return parentForm.restoreDependence(name) || (() => {
		const d = init();
		parentForm.depend(d);
		return d
	})();
}
