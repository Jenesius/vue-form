import widgets from "./widgets";

const STORE: IStore = {
	requiredMessage: 'Please fill in this field',
	inputTypes: {
		...widgets
	},
	typeNotCaseSensitive: true,
	debug: false,
	defaultType: 'text',
	cleanValue: null,
	date: {
		dateMask: "YYYY/MM/DD",
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		daysWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		calendar: {
			yearCount: 60,
			yearStart: 1965
		}
	},
	select: {
		countWithoutSearch: 6,
		searchLabel: "Search"
	}
}

type defineInputTypes = 'single-checkbox' | 'single-radio' | 'text' | 'select' | 'radio' | 'checkbox' | 'switch' | 'password' | 'tel' | 'number' | 'range' | 'textarea';
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
	},
	select: {
		countWithoutSearch: number,
		searchLabel: string
	}
}
export default STORE;

export function getFieldType(type: any) {

	if (typeof type !== 'string') return STORE.inputTypes[STORE.defaultType];
	type = STORE.typeNotCaseSensitive ? type?.toLowerCase() : type;

	const resultComponent = STORE.inputTypes[type] || STORE.inputTypes[STORE.defaultType]
	return resultComponent;
}