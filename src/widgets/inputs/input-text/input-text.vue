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
				@input="onInput(($event.target as HTMLInputElement).value)"
				@focusin = "isFocused = true"
				@focusout = "isFocused = false"
				:name = "name"
			>
		</div>
	</field-wrap>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import useModify from "../../../local-hooks/use-modify";
import {StringModify, ValidationError} from "../../../types";
import FieldWrap from "../field-wrap.vue";
import {parseNumber} from "../../../utils/parse-number";
import STORE from "../../../config/store";

const props = defineProps<{
	label?: string,
	errors: ValidationError[],
	modelValue: any,
	disabled?: boolean,
	name?: string

	autofocus?: boolean,
	pretty?: StringModify | StringModify[] | Function,
	modify?: StringModify | StringModify[]| Function
	placeholder?: string,
	maxlength?: string | number,
	prefix?: string,
	numeric?: boolean,

	maxLength?: string | number,

}>()

const isFocused = ref(false);
const refInput = ref<HTMLInputElement>(props.modelValue);
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

const executePretty = useModify(() => props.pretty);
const executeModify = useModify(
	() => [
		props.numeric ? (s) => parseNumber(s, STORE.cleanValue) : undefined,
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
	border: var(--vf-input-border-focus)
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
	padding-inline: 4px 0;
}
.input-text {
	flex-grow: 1;
	padding-inline: 4px;
	color: var(--vf-input-color);
	font-size: var(--vf-input-font-size);
}
.input-text::placeholder{
	color: var(--vf-input-placeholder-color);
}
</style>
