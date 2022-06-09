<template>
    <div class = "container__input-text">
        <p v-if = "label" class = "widget-input__label">{{label}}</p>
        <input
            class = "widget-input-text"
            type = "text"
            :value = "modelValue"
            @input = "emit('update:modelValue', $event.target.value)"
            :disabled = "disabled"
        >
    </div>
</template>

<script setup lang = "ts">
    defineProps<{
        label?: string,
        modelValue: any,
        disabled?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: any): void
    }>()

</script>

<style scoped>
    .container__input-text{
        display: flex;
        flex-direction: column;
    }
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
        background-color: #b1b1b1;
    }
</style>
