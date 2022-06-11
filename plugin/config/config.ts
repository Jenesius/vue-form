import mergeObjects from "../utils/merge-objects";
import STORE from "./store";

export default function config(params: ConfigParams) {
	
	if (params.inputTypes)
		mergeObjects(STORE.inputTypes, params.inputTypes)
	
}

interface ConfigParams {
	inputTypes?: {
		[name: string]: any
	}
}
