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

const STORE: IStore = {
	inputTypes: {
		text	: WidgetInputText,
		select	: WidgetInputSelect,
		radio	: WidgetInputRadio,
		checkbox: WidgetInputCheckbox,
		switch	: WidgetInputSwitch,
		password: WidgetInputPassword,
		tel     : WidgetInputTel,
		number  : WidgetInputNumber
	}
}
export default STORE;

type defineInputTypes = 'text' | 'select' | 'radio' | 'checkbox' | 'switch' | 'password';
interface IStore {
	inputTypes: {
		[name: defineInputTypes | string]: any
	}
}
