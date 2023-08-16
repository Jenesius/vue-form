import {FormInputValidationCallback} from "../types";
import requiredFunction from "./required-function";

export default function mergeValidation(props: Partial<FormFieldProps>) {
	const arr:FormInputValidationCallback[] = [];
	if (props.validation) arr.push(...(typeof props.validation === 'function' ? [props.validation] : props.validation));
	if (props.required) arr.unshift(requiredFunction)
	return arr;
}

interface FormFieldProps {
	validation: FormInputValidationCallback[] | FormInputValidationCallback,
	required: boolean
}