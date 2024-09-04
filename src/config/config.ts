import STORE, {IStore} from "./store";

export default function config(params: ConfigParams) {

	const savedStoreInputs = STORE.inputTypes;

	Object.assign(STORE, params);

	STORE.inputTypes = {
		...savedStoreInputs,
		...(params.inputTypes || {}),
	}

	if (STORE.typeNotCaseSensitive)
		STORE.inputTypes = Object.entries(STORE.inputTypes).reduce<Record<string, any>>((acc, [type, component]) => {
			acc[type.toLowerCase()] = component
			return acc;
		}, {})

	return;

	/*
	// In case if params includes inputTypes, merge provided component with default widgets.
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

			Store.inputTypes = {
				...STORE.inputTypes,
				...parsedInputTypes
			}
		}
	} catch (e) {
		console.error(e)
	}

	if (params.date) {
		mergeObjects(STORE.date, params.date);
	}
*/
}

type ConfigParams = Partial<IStore> & {
	inputTypes?: IStore['inputTypes']
}