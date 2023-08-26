<template>
    <field-wrap :errors = "errors">
		<element-input-radio
			:model-value="!!modelValue"
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
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function handleInput() {
        if (props.disabled) return;
        emit('update:modelValue', !props.modelValue)
    }
</script>

<style scoped>

</style>
