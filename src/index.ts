import STORE from "./config/store";
import Form from "./classes/Form";

import useFormState from "./hooks/use-form-state";
import useFormValues from "./hooks/use-form-values";

import FormField from "./widgets/form-field.vue";

import InputWrap from "./widgets/inputs/field-wrap.vue";

import utils from "./utils/utils";
import config from "./config/config";
import ComputedValue from "./classes/ComputedValue";
import widgets from "./config/widgets";
import DateController from "./controllers/date-controller";

const InputField = FormField;
export {
	STORE,
	Form,
	InputField,
	FormField,
	InputWrap,
	config,
	utils,
	ComputedValue,
	useFormState,
	useFormValues,
	widgets,
	DateController
}
