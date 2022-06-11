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
    />
</template>

<script setup lang="ts">

    import {computed, watch, withDefaults} from "vue";

    import useInputState from "../hooks/use-input-state";
    import {OptionRow} from "../types";
    import STORE from "../config/store";

    interface Props {
        type?: string,
        name?: string,
        label?: string,
        validation?: any[],
        options?: OptionRow[] | { [value: string]: string},

    }

    const props = withDefaults(defineProps<Props>(), {
        validation: () => [],
        type: 'text'
    })

    const inputsStore = STORE.inputTypes;

    const componentItem = computed(() => inputsStore[props.type] || inputsStore.text);

    const {state, input} = useInputState(props.name, props.validation);

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
    .widget-input__label{
        color: #333;
        font-size: 13px;
        margin: 4px 0;
    }
</style>
