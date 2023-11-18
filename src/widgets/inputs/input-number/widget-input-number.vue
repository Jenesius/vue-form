<template>
	<field-wrap :label = "label" :errors = "errors">
		<div class = "container-input-number"
			:class = "{
				'container-input-number_disabled': disabled,
				'container-input-number_error': errors.length !== 0
			}"
		>
			<widget-number-step
				@step = "onStep"
				v-if = "!disabled"
			/>
			<input
				ref = "refInput"
				class = "input-number"
				type = "text"
				:value = "isFocused ? modelValue : useModify(() => props.pretty)(modelValue)"
				@input = "handleInput($event.target.value)"
				:disabled = "disabled"
				:autofocus="autofocus"

				@keydown.up = "onStep(true)"
				@keydown.down = "onStep(false)"
				@focusin = "isFocused = true"
				@focusout = "isFocused = false"
			>
			<span v-if = "suffix" class = "input-number-suffix">{{suffix}}</span>
		</div>
	</field-wrap>
</template>

<script setup lang = "ts">
import WidgetNumberStep from "./widget-number-step.vue";
import {ref, withDefaults} from "vue";
import {StringModify, ValidationError} from "../../../types";
import useModify from "../../../local-hooks/use-modify";
import FieldWrap from "../field-wrap.vue";
import {parseNumber} from "../../../utils/parse-number";
interface Props{
	step?: number | string,
	label?: string,
	errors: ValidationError[],
	modelValue: unknown,
	disabled: boolean,
	autofocus?	: boolean,
	name: string,
	pretty?: StringModify | StringModify[],
	suffix?: string,
	decimal?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	step: 1
})
const isFocused = ref(false);

const emits = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()
const refInput = ref<HTMLInputElement>()
function handleInput(data: string | number) {
	const value = (typeof data !== "number") ? parseNumber(data) : data

	if (value !== props.modelValue) emits("update:modelValue", value);
	if (refInput.value) refInput.value.value = String(data).replace(/[^0-9.,+-]|/g, '')
}

function onStep(v: boolean) {
	const multiDir = v ? 1 : -1 // Direction of the step. +1 - Up, -1 -Down
	const value = typeof props.modelValue !== "number" ? 0 : props.modelValue
	handleInput(Number(props.step) * multiDir + value )
}

</script>

<style scoped>

	.container-input-number{
		display: flex;
		border: 1px solid var(--vf-input-border-color);
		height: var(--vf-input-height);
		border-radius: var(--vf-input-border-radius);
		background-color: var(--vf-input-background);
	}
	.container-input-number_disabled{
		background-color: var(--vf-input-background-disabled);
		position: relative;
	}
	.container-input-number_error{
		border: var(--vf-input-border-error);
	}

	.container-input-number:focus-within {
		border: var(--vf-input-border-focus);
	}
	.input-number{
		display: flex;
		flex-grow: 1;
		border: 0;
		outline: none;
		padding: 0 4px;
		color: var(--vf-input-color);

		background-color: transparent;
	}

	.container-input-number_disabled>div:nth-child(1) {
		background-color: var(--vf-input-white-dark);
		cursor: default;
	}
	.container-input-number_disabled>div:nth-child(1):after{
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 0;
	}
	.input-number-suffix {
        color: var(--vf-input-black-light);
        line-height: var(--vf-input-height);
        font-size: var(--vf-input-font-size);
		padding-inline-end: 5px;
	}
</style>
