<template>
    <input-wrap :errors = "errors">
		<element-input-radio :model-value="!!modelValue" :disabled="disabled" :label="label" :error="!!errors.length" @click = "onInput"/>
    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
	import ElementInputRadio from "./../input-radio/element-input-radio.vue";

    const props = defineProps<{
        label?: string,
        modelValue: any,
        disabled: boolean,
		errors: string[],
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function onInput() {
        if (props.disabled) return;
        emit('update:modelValue', !props.modelValue)
    }

</script>

<style scoped>

</style>
