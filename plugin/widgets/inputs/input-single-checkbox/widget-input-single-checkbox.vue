<template>
    <input-wrap >
		<element-input-checkbox
			:model-value="modelValue"
			:disabled="disabled"
			:label = "label"
			@click = "onInput"
			@keyup.enter="onInput()"
		/>
    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
	import ElementInputCheckbox from "../input-checkbox/element-input-checkbox.vue";

    const props = defineProps<{
        label?: string,
        modelValue: any,
        disabled: boolean
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
