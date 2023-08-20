import Form from "../classes/Form";
import {FormInput, FormInputValidationCallback, ValidationError} from "../types";
import {reactive} from "vue";

export default function useFormInput(parentForm: Form) {

	if (!parentForm) return null;
	let offDependency: undefined | (() => void );
	const input = reactive<Partial<FormInput>>({ setValidation, setValue, setName, validationRules: [], deactivate }) as FormInput

	return input;


	/**
	 * @description Функция перепривязывает все обработчики для значений и доступности.
	 * */
	function setName(name: string | null) {
		if (name === null) return new Error('Input without name');

		input.name = name;
		// Отписываемся от формы для старого поля, подписываемся для нового
		deactivate()
		offDependency = parentForm.subscribe(getNewDependency(input))

		parentForm.oninput(name, updateInput)
		parentForm.onavailable(name, updateAvailability)

		// Начальная инициализация состояния Input
		updateInput();
		updateAvailability();
		setValidation([]);
	}

	function updateInput() {
		input.value = parentForm.getValueByName(input.name);
		input.changed = parentForm.checkFieldChange(input.name);
	}
	function updateAvailability() {
		input.disabled = parentForm.checkFieldDisable(input.name);
	}
	function setValidation(array?: FormInputValidationCallback[] | FormInputValidationCallback) {
		input.validationRules = typeof array === 'function' ? [array] : (array || []);
	}
	function setValue(value: any) {
		parentForm?.change({ [input.name]: value });
	}

	function deactivate() {
		if (offDependency) offDependency();
	}
}

function getNewDependency(input: FormInput) {
	return {
		name: input.name,
		validate() {
			input.errors = input.validationRules.reduce((acc: ValidationError[], guard) => {
				const guardResult = guard(input.value);
				if (guardResult !== true) acc.push(guardResult);
				return acc;
			}, []);

			return input.errors.length === 0
		}
	}
}