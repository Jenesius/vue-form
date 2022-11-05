import mergeObjects from "../utils/merge-objects";
import STORE from "./store";
import debug from "../debug/debug";

export default function config(params: ConfigParams) {

	/**
	 * In case if params includes inputTypes, merge provided component with default widgets.
	 */
	if (params.inputTypes)
		mergeObjects(STORE.inputTypes, params.inputTypes)

	STORE.debug = params.debug || false;

	if (STORE.debug) debug.msg('Debugging turn on');
}

interface ConfigParams {
	inputTypes?: {
		[name: string]: any
	},
	debug?: boolean
}
