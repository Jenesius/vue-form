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
	.container-input-single-checkbox {
		display: flex;
		gap: 10px;
		align-items: center;
	}
    .input-checkbox{
        width: 18px;
        height: 18px;
        margin: 0;
        border: 1px solid #c8c8c8;
        background-color: white;
        border-radius: 3px;
        display: grid;
        place-content: center;

		cursor: pointer;
    }
    .input-checkbox_active {
		background-color: #4e74ff;
	}
    .input-checkbox_disabled{
        background-color: #e9e9e9;
    }
    .input-checkbox_disabled.input-checkbox_active{
        background-color: #bac7f8;
    }

    .input-checkbox_disabled{
        cursor: default;
    }

    i.check {
        display: none;
        width: 4px;
        height: 7px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate( 45deg);
        margin: 1px 1px 4px 1px;
    }
    .input-checkbox_active>i{
        display: inline-block;
    }
</style>
