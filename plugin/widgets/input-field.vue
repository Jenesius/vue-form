<template>
    <component
        :is = "componentItem"
        :name = "name"

        :modelValue = "state.value"
        @update:modelValue = "v => input.change(v)"

        :label = "props.label"
        :disabled = "state.disabled"
        :errors = "state.errors"
        :options = "options"
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
        options?: OptionRow[],

    }

    const props = withDefaults(defineProps<Props>(), {
        validation: () => [],
        type: 'text'
    })

    const inputsStore = STORE.inputTypes;

    const componentItem = computed(() => inputsStore[props.type] || inputsStore.text);

    const {state, input} = useInputState(props.name, props.validation);
/*
    watch(() => props.modelValue, (a, b) => {
        if (a === b) return;
        input.value = props.modelValue
    }, {
        immediate: true
    })
*/

</script>

<style>
    .widget-input__label{
        color: #333;
        font-size: 13px;
        margin: 4px 0;
    }
</style>
