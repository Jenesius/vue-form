<template>
    <input-wrap :label = "label" :errors = "errors">
        <input
            ref = "refInput"
            class = "widget-input-text"
            type = "text"
            :value = "pretty(modelValue)"
            @input = "onInput($event.target.value)"
            :disabled = "disabled"
            :class = "{
				'input-text_error': errors.length !== 0
            }"
			:autofocus="autofocus"
			:placeholder="placeholder"
        >
    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
    import {ref} from "vue";

	const props = withDefaults(defineProps<{
		label?: string,
		errors: string[],
		modelValue: any,
		disabled: boolean,
		autofocus: boolean,
		pretty?: (a: string) => string,
		placeholder?: string,
    maxLength?: string | number
	}>(), {
		pretty: (a: string) => a
	})

    const refInput = ref(props.modelValue);
    const emit = defineEmits<{
        (e: 'update:modelValue', value: any): void
    }>()

    function onInput(v: string) {
      if (props.maxLength)
        v = v.slice(0, Number(props.maxLength))

      refInput.value.value = v;
      emit('update:modelValue', v);

    }

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
