<template>
	<field-wrap :label="label" :errors="errors">
		<div
			class = "container-input-text"
			:class="{
					'container-input-text_error': errors.length !== 0,
					'container-input-text_disabled': disabled
			}"
		>
			<span class = "input-text-prefix" v-if = "prefix">{{prefix}}</span>
			<input
				ref="refInput"
				class="vf-input_clean input-text"
				type="text"
				:value="isFocused ? modelValue : executePretty(modelValue)"
				:disabled="disabled"
				:autofocus="autofocus"
				:placeholder="placeholder"
				@input="onInput($event.target.value)"
				@focusin = "isFocused = true"
				@focusout = "isFocused = false"
				:name = "name"
			>
		</div>
	</field-wrap>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import useModify from "./../../local-hooks/use-modify";
import {FormInputValidationCallback, StringModify, ValidationError} from "./../../types";
import onlyNumber from "./../../local-hooks/only-number";
import FieldWrap from "../field-wrap.vue";


const props = defineProps<{
	label?: string,
	modelValue: any,
	disabled?: boolean,
	autofocus?: boolean,
	pretty?: StringModify | StringModify[] | Function,
	modify?: StringModify | StringModify[]| Function
	placeholder?: string,
	maxLength?: string | number,
	maxlength?: string | number,
	prefix?: string,
	name?: string
	numeric?: boolean,
    errors: ValidationError[]
}>()

const isFocused = ref(false);
const refInput = ref<HTMLInputElement>(props.modelValue);
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

const executePretty = useModify(() => props.pretty);
const executeModify = useModify(
	() => [
		props.numeric ? onlyNumber : undefined,
		...(Array.isArray(props.modify) ? props.modify : [props.modify])
	]
)

function onInput(v: string) {
	if (
		("maxlength" in props && props.maxlength !== undefined) ||
		("maxLength" in props && props.maxlength !== undefined)) v = v.slice(0, Number(props.maxlength || props.maxLength))

	v = executeModify(v);

	refInput.value.value = v;
	emit('update:modelValue', v);
}

watch(() => props.maxLength, () => onInput(props.modelValue));

</script>

<style scoped>
.container-input-text {
	display: flex;
	height: var(--vf-input-height);
	border-radius: var(--vf-input-border-radius);
	border: var(--vf-input-border);
	background-color: var(--vf-input-background);
}
.container-input-text:focus-within {
	border-color: var(--vf-input-gray-dark);
}
.container-input-text_disabled {
	background-color: var(--vf-input-background-disabled);
}
.container-input-text_error {
	border: var(--vf-input-border-error);
}
.input-text-prefix {
	color: var(--vf-input-black-light);
	line-height: var(--vf-input-height);
	font-size: var(--vf-input-font-size);
	padding: 0 0 0 4px;
}
.input-text {
	flex-grow: 1;
	padding: 0 4px;
	color: var(--vf-input-color);
	font-size: var(--vf-input-font-size);
}
</style>
