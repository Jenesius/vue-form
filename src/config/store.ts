import InputText from "./../widgets/input-text/input-text.vue";
import InputDate from "../widgets/input-date/input-date.vue"
import InputSelect from "../widgets/input-select/input-select.vue"

const STORE: IStore = {
	requiredMessage: 'Please fill in this field',
	inputTypes: {
		text	: InputText,
		date	: InputDate,
		select  : InputSelect
	},
	typeNotCaseSensitive: true,
	debug: false,
	defaultType: 'text',
	cleanValue: null,
	date: {
		dateMask: "dd/mm/yyyy",
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		daysWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		calendar: {
			yearCount: 60,
			yearStart: 1965
		}
	}
}

type defineInputTypes = 'text' | 'select' | 'radio' | 'checkbox' | 'switch' | 'password' | 'tel' | 'number' | 'range' | 'textarea';
export interface IStore {
	inputTypes: {
		[name: defineInputTypes | string]: any
	},
	requiredMessage: string,
	typeNotCaseSensitive: boolean
	debug: boolean,
	defaultType: string,
	cleanValue: any,
	date: {
		dateMask: string,
		months: string[],
		daysWeek: string[],
		calendar: {
			yearCount: number,
			yearStart: number
		}
	}
}
export default STORE;

export function getFieldType(type: any) {
	if (typeof type !== 'string') return STORE.inputTypes[STORE.defaultType];

	type = STORE.typeNotCaseSensitive ? type?.toLowerCase() : type;
	return STORE.inputTypes[type] || STORE.inputTypes[STORE.defaultType];
}