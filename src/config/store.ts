import InputText from "./../widgets/input-text/input-text.vue";


const STORE: IStore = {
	requiredMessage: 'Please fill in this field',
	inputTypes: {
		text	: InputText,
	},
	typeNotCaseSensitive: true,
	debug: false,
	defaultType: 'text'
}

type defineInputTypes = 'text' | 'select' | 'radio' | 'checkbox' | 'switch' | 'password' | 'tel' | 'number' | 'range' | 'textarea';
export interface IStore {
	inputTypes: {
		[name: defineInputTypes | string]: any
	},
	requiredMessage: string,
	typeNotCaseSensitive: boolean
	debug: boolean,
	defaultType: string
}
export default STORE;


export function getFieldType(type: any) {
	if (typeof type !== 'string') return STORE.inputTypes[STORE.defaultType];

	type = STORE.typeNotCaseSensitive ? type?.toLowerCase() : type;
	return STORE.inputTypes[type] || STORE.inputTypes[STORE.defaultType];
}
