import mergeObjects from "../utils/merge-objects";
import STORE from "./store";

export default function config(params: ConfigParams) {

	/**
	 * In case if params includes inputTypes, merge provided component with default widgets.
	 */
	if (params.inputTypes)
		mergeObjects(STORE.inputTypes, params.inputTypes)
	
}

interface ConfigParams {
	inputTypes?: {
		[name: string]: any
	}
}
