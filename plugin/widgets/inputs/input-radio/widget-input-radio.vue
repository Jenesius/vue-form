<template>
    <input-wrap :label = "label" :errors = "errors">

        <div class = "container-input-radio" >
			<element-input-radio
				v-for = "item in options"
				:key = "item.value"

				:model-value="modelValue === item.value"
				:disabled="disabled"
				:label="item.label || item.title"
				:error="!!errors.length"
				@input = "onInput(item.value)"
			/>

        </div>

    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
    import {OptionRow} from "../../../types";
	import ElementInputRadio from "./element-input-radio.vue";

    const props = defineProps<{
        label?: string,
        options: OptionRow[],
        modelValue: any,
        disabled: boolean,
		errors: string[],
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function onInput(v:void) {
        if (props.disabled) return;
        emit('update:modelValue', v)
    }

</script>

<style scoped>
    .container-input-radio{
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    .container-input-radio:focus{
      outline: none;
    }
</style>
