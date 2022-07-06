<template>
    <input-wrap :label = "label">
        <input
            class = "widget-input-text"
            type = "text"
            :value = "modelValue"
            @input = "emit('update:modelValue', $event.target.value)"
            :disabled = "disabled"
            :class = "{
				'input-text_error': errors.length !== 0
            }"
        >
    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "./input-wrap.vue";

    defineProps<{
        label?: string,
        modelValue: any,
        disabled?: boolean,
        errors: string[]
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: any): void
    }>()

</script>

<style scoped>
    .widget-input-text{
        height: 35px;
        border-radius: 4px;
        border: 1px solid #c8c8c8;
        outline: none;
        padding: 0 4px;
        color: #1c1c1c;
    }
    .widget-input-text:focus{
        border-color: #b2b2b2;
    }

    .widget-input-text:disabled{
        background-color: #e9e9e9;
    }
    .input-text_error{
	    border: 1px solid #fa5c5c;
    }
</style>
