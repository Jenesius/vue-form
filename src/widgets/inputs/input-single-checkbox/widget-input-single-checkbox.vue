<template>
	<field-wrap :errors = "errors">
		<element-input-checkbox
			:model-value="values ? modelValue === values[0] : modelValue || false"
			:disabled="disabled"
			:tabindex="disabled? 'none' : 0"
			:label="label"
			@click="onInput"
			@keyup.enter="onInput"
			@keydown.space.prevent
			@keyup.space="onInput"
			:has-error = "errors.length !== 0"
		/>
	</field-wrap>
</template>

<script setup lang="ts">
import FieldWrap from "../field-wrap.vue";
import ElementInputCheckbox from "../input-checkbox/element-input-checkbox.vue";
import getNextFormToggleValues from "../../../utils/get-next-from-toggle-values";

const props = defineProps<{
	label?: string,
	modelValue: any,
	disabled: boolean,
	values?: [any, any],
	errors: string[]
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

function onInput() {
	if (props.disabled) return;

	const value = props.values ? getNextFormToggleValues(props.values, props.modelValue) : !props.modelValue;
	emit('update:modelValue', value)
}

</script>

<style scoped>

</style>
