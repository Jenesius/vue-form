import InputText from "../widgets/inputs/input-text/input-text.vue";
import InputDate from "../widgets/inputs/input-date/input-date.vue";
import InputSelect from "../widgets/inputs/input-select/input-select.vue";
import InputRadio from "../widgets/inputs/input-radio/widget-input-radio.vue";
import InputCheckbox from "../widgets/inputs/input-checkbox/widget-input-checkbox.vue";
import InputSwitch from "../widgets/inputs/input-switch/widget-input-switch.vue";
import InputPassword from "../widgets/inputs/input-password/widget-input-password.vue";
import InputTel from "../widgets/inputs/input-tel/widget-input-tel.vue";
import InputNumber from "../widgets/inputs/input-number/widget-input-number.vue";
import InputRange from "../widgets/inputs/input-range/widget-input-range.vue";
import InputTextarea from "../widgets/inputs/input-textarea/widget-input-textarea.vue";
import InputSingleCheckbox from "../widgets/inputs/input-single-checkbox/widget-input-single-checkbox.vue";
import InputSingleRadio from "../widgets/inputs/input-single-radio/widget-input-single-radio.vue";

export default {
	text	: InputText,
	date	: InputDate,
	select  : InputSelect,
	radio	: InputRadio,
	checkbox: InputCheckbox,
	switch	: InputSwitch,
	password: InputPassword,
	tel     : InputTel,
	number  : InputNumber,
	range   : InputRange,
	textarea: InputTextarea,
	'single-checkbox': InputSingleCheckbox,
	'single-radio'	: InputSingleRadio
}