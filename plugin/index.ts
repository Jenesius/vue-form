import Form from "./classes/Form";
import FormProxy from "./classes/FormProxy";

import useFormState from "./hooks/use-form-state";
import useInputState from "./hooks/use-input-state";
import useProxyState from "./hooks/use-proxy-state";

import config from "./config/config";
import STORE from "./config/store";

import InputField from "./widgets/input-field.vue";

export {
	Form,
	FormProxy,
	
	useProxyState,
	useInputState,
	useFormState,
	
	InputField,
	config,
	STORE
}
