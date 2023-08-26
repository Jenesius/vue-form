<template>
    <field-wrap :errors = "errors">
		<element-input-radio
			:model-value="values ? modelValue === values[0] : modelValue || false"
			:disabled="disabled"
			:label="label"
			:error="!!errors.length"
			:tabindex = "!disabled ? 0 : 'none'"

			@input = "handleInput"
			@keyup.enter="handleInput"
			@keydown.space.prevent
			@keyup.space.prevent="handleInput"
		/>
    </field-wrap>
</template>

<script setup lang = "ts">
	import ElementInputRadio from "./../input-radio/element-input-radio.vue";
	import FieldWrap from "../field-wrap.vue";

    const props = defineProps<{
        label?: string,
        modelValue: any,
        disabled: boolean,
		errors: string[],
		values?: [any, any],
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function handleInput() {
		if (props.disabled) return;

		const value = props.values ? props.modelValue === props.values[0] ? props.values[1] : props.values[0] : !props.modelValue;
		emit('update:modelValue', value)
    }
</script>

<style scoped>

</style>
