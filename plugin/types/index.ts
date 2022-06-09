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

