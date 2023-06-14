<template>
    <input-wrap >
		<element-input-checkbox
			:model-value="values ? modelValue === values[0] : modelValue"
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
        disabled: boolean,
		values?: [any, any]
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
