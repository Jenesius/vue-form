import Form from "../classes/Form";
import {FormInput, FormInputValidationCallback, InputDependency, ValidationError} from "../types";
import {onMounted, onUnmounted, reactive} from "vue";

export default function useFormInput(parentForm: Form, name: string) {

	const input = reactive<Partial<FormInput>>({}) as FormInput
	input.setValidation = setValidation;
	input.setValue = setValue;

	let validation: FormInputValidationCallback[] = []

	updateInput();
	updateAvailability();

	parentForm.oninput(name, updateInput)
	parentForm.onavailable(name, updateAvailability)

	const inputDependency: InputDependency = {
		name,
		validate() {
			input.errors = validation.reduce((acc: ValidationError[], guard) => {
				const guardResult = guard(input.value);
				if (guardResult !== true) acc.push(guardResult);
				return acc;
			}, []);

			return input.errors.length === 0
		}
	}

	onMounted(() => parentForm.subscribe(inputDependency))
	onUnmounted(() => parentForm.unsubscribe(inputDependency))


	return input;

	function updateInput() {
		input.value = parentForm.getValueByName(name);
		input.changed = parentForm.checkFieldChange(name);
	}
	function updateAvailability() {
		input.disabled = parentForm.checkFieldDisable(name);
	}
	function setValidation(array?: FormInputValidationCallback[] | FormInputValidationCallback) {
		validation = typeof array === 'function' ? [array] : (array || []);
	}
	function setValue(value: any) {
		parentForm?.change({ [name]: value });
	}

}