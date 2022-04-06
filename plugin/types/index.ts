export interface Values {
	[name: string]: any
}

export type ValidationRule = (value: any) => boolean
