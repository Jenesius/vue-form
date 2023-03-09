import WidgetInputText from "../widgets/inputs/input-text/widget-input-text.vue";
import WidgetInputSelect
	from "../widgets/inputs/input-select/widget-input-select.vue";
import WidgetInputRadio
	from "../widgets/inputs/input-radio/widget-input-radio.vue";
import WidgetInputCheckbox
	from "../widgets/inputs/input-checkbox/widget-input-checkbox.vue";
import WidgetInputSwitch
	from "../widgets/inputs/input-switch/widget-input-switch.vue";
import WidgetInputPassword
	from "../widgets/inputs/input-password/widget-input-password.vue";
import WidgetInputTel from "../widgets/inputs/input-tel/widget-input-tel.vue";
import WidgetInputNumber from "../widgets/inputs/input-number/widget-input-number.vue";
import WidgetInputRange from "../widgets/inputs/input-range/widget-input-range.vue";
import WidgetInputTextarea from "../widgets/inputs/input-textarea/widget-input-textarea.vue";
import WidgetInputSingleCheckbox from "../widgets/inputs/input-single-checkbox/widget-input-single-checkbox.vue";
import WidgetInputSingleRadio from "../widgets/inputs/input-single-radio/widget-input-single-radio.vue";

const STORE: IStore = {
	requiredMessage: 'Please fill in this field',
	inputTypes: {
		text	: WidgetInputText,
		select	: WidgetInputSelect,
		radio	: WidgetInputRadio,
		checkbox: WidgetInputCheckbox,
		switch	: WidgetInputSwitch,
		password: WidgetInputPassword,
		tel     : WidgetInputTel,
		number  : WidgetInputNumber,
		range   : WidgetInputRange,
		textarea: WidgetInputTextarea,
		'single-checkbox': WidgetInputSingleCheckbox,
		'single-radio'	: WidgetInputSingleRadio
	},
	debug: false
}

type defineInputTypes = 'text' | 'select' | 'radio' | 'checkbox' | 'switch' | 'password' | 'tel' | 'number' | 'range' | 'textarea';
interface IStore {
	inputTypes: {
		[name: defineInputTypes | string]: any
	},
	requiredMessage: string,
	debug: boolean
}
export default STORE;

