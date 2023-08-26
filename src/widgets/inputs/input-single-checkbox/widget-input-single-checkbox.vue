<template>
	<field-wrap :errors = "errors">
		<element-input-checkbox
			:model-value="values ? modelValue === values[0] : modelValue || false"
			:disabled="disabled"
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

	const value = props.values ? props.modelValue === props.values[0] ? props.values[1] : props.values[0] : !props.modelValue;
	emit('update:modelValue', value)
}

</script>

<style scoped>

</style>
