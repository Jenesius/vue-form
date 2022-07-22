<template>
    <component
        :is = "componentItem"
        :name = "name"

        :modelValue = "state.value"
        @update:modelValue = "v => input.change(v)"

        :label = "props.label"
        :disabled = "state.disabled"
        :errors = "state.errors"
        :options = "parseOptions(options)"
		:autofocus="autofocus"
    />
</template>

<script setup lang="ts">

    import {computed, watch, withDefaults} from "vue";

    import useInputState from "../hooks/use-input-state";
	import {OptionRow} from "../types";
    import STORE from "../config/store";

	
    const props = withDefaults(defineProps<{
		type?: string,
		name?: string,
		label?: string,
		validation?: any[],
		options?: OptionRow[] | Record<string, string>,
	
		required?: boolean,
		
		autofocus?: boolean
	}>(), {
        validation: () => [],
        type: 'text'
    })

    const inputsStore = STORE.inputTypes;

    const componentItem = computed(() => inputsStore[props.type] || inputsStore.text);

	/**
     * @description Extend validation array with default validation rules, like: Required
     */
	const extendValidation = computed(() => {
		const arr = [...(props.validation || [])];
		if (props.required) arr.push((v: any) => !!v || 'Please fill in this field')
        return arr;
    })

    const {state, input, updateName} = useInputState(props.name, extendValidation.value);
	watch(() => props.name, () => {
		if (props.name) updateName(props.name);
	})
    watch(() => props.modelValue, (a, b) => {
        if (a === b) return;
        input.value = props.modelValue
    }, {
        immediate: true
    })

    /**
     * @description Parsing OptionsObject to ObjectRow[]
     */
    function parseOptions(v: typeof props.options) {
        if (!v) return [];
        if (Array.isArray(v)) return v;

        return Object.entries(v).map(arr => ({ value: arr[0], title: arr[1] }));
    }

</script>

<style>
	.arrow {
		border: solid #8f8f8f;
		border-width: 0 2px 2px 0;
		display: inline-block;
		padding: 3px;
		transition: transform 150ms, background-color 0.2s;

	}
	.down {
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
	}
	.up {
		transform: rotate(-135deg);
		-webkit-transform: rotate(-135deg);
	}
    .widget-input__label{
        color: #333;
        font-size: 13px;
        margin: 4px 0;
    }
</style>
