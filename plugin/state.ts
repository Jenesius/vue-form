export const STATE = {
	inputs: {
	
	}
}
export default function config(params: ConfigParams) {
	STATE.inputs = params.inputs;
}
interface ConfigParams {
	inputs: {
		[name: string] : any
	}
}
