import mergeObjects from "../utils/merge-objects";
import STORE, {IStore} from "./store";
import Store from "./store";

export default function config(params: ConfigParams) {

	/**
	 * In case if params includes inputTypes, merge provided component with default widgets.
	 */
	if ("typeNotCaseSensitive" in params && typeof params.typeNotCaseSensitive === "boolean") Store.typeNotCaseSensitive = params.typeNotCaseSensitive;

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