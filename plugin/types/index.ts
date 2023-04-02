export interface Values {
	[name: string]: Value
}
export type Value = Values | any;

export type ValidationRule = (value: any) => boolean | string;

export type FunctionHandleData = () => Promise<any> | any | void;

export type ValidationGuard = () => void

export type OptionRow = IOptionRowWithLabel | IOptionRowWithTitle

interface IOptionRowWithLabel {
	label: string,
	value: any
}
interface IOptionRowWithTitle {
	title: string,
	value: any
}


export interface FormDependence {
	name?: string,
	changed?: boolean
	disable?: (name?: string | string[]) => void,
	enable? : (name?: string | string[]) => void,
	change ?: (v: any) => void,
	setValues?: (v: any) => void,
	validate?: () => boolean | string | string[],
	cleanChanges?: (values?: any) => void
}
export interface NamedFormDependence extends FormDependence{
	name: string
}

export interface InputProps {

}

/**
 * @description Current interface using for special widget-inputs, not for InputField
 * */
export type IPropsInput = {
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus: boolean
}

