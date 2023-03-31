<template>
	<component
		:is="componentItem"
		:name="name"

		:modelValue="props.name ? state.value : modelValue"
		@update:modelValue="handleInput"

		:label="props.label"
		:disabled="state.disabled"
		:errors="state.errors"
		:options="parseOptions(options)"
		:autofocus="autofocus"
	/>
</template>

<script setup lang="ts">
import {computed, onMounted, watch, withDefaults} from "vue";

import useInputState from "../hooks/use-input-state";
import {OptionRow} from "../types";
import STORE from "../config/store";
import {utils} from "../index";

interface IProps {
	type?: string,
	name?: string,
	label?: string,
	validation?: any[],
	options?: OptionRow[] | Record<string, any>,
	required?: boolean,
	autofocus?: boolean,
	modelValue?: any
}

const props = withDefaults(defineProps<IProps>(), {
	validation: () => [],
	type: 'text',
})
const emits = defineEmits<{
	(event: 'update:modelValue', value: any): void
	(event: 'input', value: any): void
}>()

const inputsStore = STORE.inputTypes;

// By default, used text component in the store.
const componentItem = computed(() => {
	const type = STORE.typeNotCaseSensitive ? props.type?.toLowerCase() : props.type;
	return inputsStore[type] || inputsStore.text
});

/**
 * @description Extend validation array with default validation rules, like: Required
 */
const extendValidation = computed(() => {
	const arr = [...props.validation];
	if (props.required) arr.push((v: any) => !!v || STORE.requiredMessage)
	return arr;
})

const {state, input, updateName} = useInputState(props.name, extendValidation.value);
watch(() => props.name, () => {
	if (props.name) updateName(props.name);
})
watch(() => props.modelValue, (a, b) => {
	if (a === b) return;
	input.value = props.modelValue
}, {
	immediate: true
})
onMounted(() => {
	if (props.name && props.modelValue !== undefined)
		if (process.env.NODE_ENV !== 'production') {
			console.warn(`[jenesius-vue-form] The use of name(${props.name}) and modelValue results in bifurcation of the single state of the form. More information here https://form.jenesius.com/guide/model-value.html`)
		}
})


/**
 * @description Parsing OptionsObject to ObjectRow[]
 */
function parseOptions(v: typeof props.options) {
	if (!v) return [];
	if (Array.isArray(v)) return v;

	return utils.convertOptionsObject(v);
}


function handleInput(v: any) {
	input.change(v);
	emits('update:modelValue', v)
	emits('input', v)
}

</script>

<style>
@import "./../styles/main.css";
.arrow {
	border: solid #8f8f8f;
	border-width: 0 2px 2px 0;
	display: inline-block;
	padding: 3px;
	transition: transform 150ms, background-color 0.2s;

}

.down {
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
}

.up {
	transform: rotate(-135deg);
	-webkit-transform: rotate(-135deg);
}

.widget-input__label {
	color: #333;
	font-size: 13px;
	margin: 4px 0;
}
</style>
