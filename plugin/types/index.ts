export interface Values {
	[name: string]: any
}

export type ValidationRule = (value: any) => boolean | string;

export type FunctionHandleData = () => Promise<any> | any | void
