export interface Values {
	[name: string]: any
}

export type ValidationRule = (value: any) => boolean | string;

export type FunctionHandleData = () => Promise<any> | any | void;

export type ValidationGuard = () => void

export interface OptionRow {
	title: string,
	value: any
}

export interface FormDependence {
	name?: string,
	disable: (name?: string | string[]) => void,
	enable : (name?: string) => void,
	change : (v: any) => void,
	validate: () => boolean | string
}
export interface NamedFormDependence extends FormDependence{
	name: string
}
