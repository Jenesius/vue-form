import mergeObjects from "../utils/merge-objects";
import STORE, {IStore} from "./store";
import Store from "./store";
import debug from "../debug/debug";

export default function config(params: ConfigParams) {

	/**
	 * In case if params includes inputTypes, merge provided component with default widgets.
	 */
	if ("typeNotCaseSensitive" in params && typeof params.typeNotCaseSensitive === "boolean") Store.typeNotCaseSensitive = params.typeNotCaseSensitive;


	if ("debug" in params && typeof params.debug === "boolean") {
		STORE.debug = params.debug;
		debug.msg('Debugging turn on');
	}

	try {
		if (params.inputTypes) {
			let parsedInputTypes = params.inputTypes;

			if (STORE.typeNotCaseSensitive)
				parsedInputTypes = Object.entries(params.inputTypes).reduce<Record<string, any>>((acc, [type, component]) => {
					acc[type.toLowerCase()] = component
					return acc;
				}, {})

			mergeObjects(STORE.inputTypes, parsedInputTypes)
		}
	} catch (e) {
		console.error(e)
	}
}

type ConfigParams = Partial<IStore> & {
	inputTypes?: IStore['inputTypes']
}