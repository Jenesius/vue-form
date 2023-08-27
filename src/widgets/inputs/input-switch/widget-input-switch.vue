<template>
	<field-wrap :errors = "errors">
		<div class="container-input-switch">
			<div class="input-switch"

				 :class="{
                     'input-switch_disabled': disabled,
                     'vf-input-switch_error': errors && errors.length !== 0
                 }"
				 :tabindex=" disabled ? 'none' : 0"

				 @click="onInput()"
				 @keyup.enter = "onInput()"
				 @keyup.space = "onInput()"
			>
				<div class="input-switch-button"
					 :class="{
                    'input-switch-button_active': values ? values[0] === modelValue : !!modelValue
                }"
				></div>
			</div>
			<p class="input-switch-label vf-input-label">{{ label }}</p>
		</div>

	</field-wrap>
</template>

<script setup lang="ts">
import FieldWrap from "../field-wrap.vue";
import {ToggleValues} from "../../../types";
import getNextFormToggleValues from "../../../utils/get-next-from-toggle-values";

const props = defineProps<{
	label?: string,
	modelValue: any,
	disabled: boolean,
	errors: string[],
	values?: ToggleValues
}>()


const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

function onInput(v = props.values ? getNextFormToggleValues(props.values, props.modelValue) : !props.modelValue) {
	if (props.disabled) return;

	emit('update:modelValue', v)
}

</script>

<style scoped>
.container-input-switch {
	display: flex;
	gap: 12px;
	align-items: center;
}

.input-switch {
	width: 38px;
	border-radius: 11px;
	border: var(--vf-input-border);
	height: 21px;
	box-sizing: border-box;
	cursor: pointer;
	display: flex;
	outline: none;
	align-items: center;
	background-color: var(--vf-input-background);
}

.input-switch:focus {
	border: var(--vf-input-border-focus);
}
.input-switch-button {
	height: 15px;
	aspect-ratio: 1/1;
	background-color: var(--vf-input-gray-light);
	border-radius: 50%;
	transform: translateX(3px);
	transition: transform var(--vf-input-transtion-fast), color var(--vf-input-transtion-fast);
}

.input-switch-button_active {
	background-color: var(--vf-input-active);
	transform: translateX(18px);
}
.vf-input-switch_error {
	border: var(--vf-input-border-error);
}

.input-switch-label {
	margin: 0;
}

.input-switch_disabled {
	background-color: var(--vf-input-background-disabled);
	cursor: default;
}

.input-switch_disabled .input-switch-button_active {
	background-color: var(--vf-input-active-disabled)
}
</style>
