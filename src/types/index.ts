export interface Values {
	[name: string]: Value
}
export type Value = Values | any;

/**
 * @description Callback использующийся для валидации поля для ввода.
 * */
export type FormInputValidationCallback = (values: any) => boolean | string
export type ValidationError = string | false

export type ValidationRule = () => boolean | string;

export type FunctionHandleData = () => Promise<any> | any | void;

export type ValidationGuard = () => void

export type OptionRow = IOptionRowWithLabel | IOptionRowWithTitle

export interface IOptionRowWithLabel {
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


export type StringModify = (v: unknown) => string


export interface SimpleFormParams {
	name?: string
}

export interface FormSetValuesOptions {
	change: boolean,
	/**
	 * @description Имя целевого объекта для которого был вызван setValues
	 * */
	target: string,
	
	/**
	 * Место, откуда был event вызван. Является результатом работы функции getTargetName();
	 * */
	executedFrom: string
	/**
	 * @description Полностью заменяет предыдущее значение, а не добавляет(не используется примешивание) к нему значений.
	 * */
	clean: boolean
}

export interface FormAvailability {
	[name: string]: boolean
}