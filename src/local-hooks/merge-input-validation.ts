import {FormFieldValidationCallback} from "../types";
import requiredFunction from "./required-function";

export default function mergeValidation(props: Partial<FormFieldProps>) {
	const arr:FormFieldValidationCallback[] = [];
	if (props.validation) arr.push(...(typeof props.validation === 'function' ? [props.validation] : props.validation));
	if (props.required) arr.unshift(requiredFunction)
	return arr;
}

interface FormFieldProps {
	validation: FormFieldValidationCallback[] | FormFieldValidationCallback,
	required: boolean
}