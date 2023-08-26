export interface Values {
	[name: string]: Value
}
export type Value = Values | any;

/**
 * @description Callback использующийся для валидации поля для ввода.
 * */
export type FormFieldValidationCallback = (values: any) => true | ValidationError
export type ValidationError = string | false

export type FormFieldOptions = OptionRow | Record<string, string>

export type OptionRow = IOptionRowWithLabel | IOptionRowWithTitle

export interface IOptionRowWithLabel {
	label: string,
	value: any
}
interface IOptionRowWithTitle {
	title: string,
	value: any
}

export interface FormInput {
	name: string,
	value: any,
	changed: boolean,
	disabled: boolean,
	errors: ValidationError[],
	setValidation(arr: FormFieldValidationCallback[]): void,
	setValue(v: any): void,
	setName(name: string | null): void,
	validationRules: FormFieldValidationCallback[],
	deactivate: () => void
}

export interface InputDependency {
	name: string,
	validate: FormFieldValidationCallback
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

export type OnFunction<T> = (v: T) => string