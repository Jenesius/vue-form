<template>
    <component
        :is = "componentItem"

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

    import WidgetInputText from "./inputs/widget-input-text.vue";
    import WidgetInputSelect from "./inputs/input-select/widget-input-select.vue";
    import WidgetInputRadio from "./inputs/input-radio/widget-input-radio.vue";
    import WidgetInputCheckbox from "./inputs/input-checkbox/widget-input-checkbox.vue";
    import WidgetInputSwitch from "./inputs/input-switch/widget-input-switch.vue";
    import useInputState from "../hooks/use-input-state";
    import {OptionRow} from "../types";

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

    const store = {
        text: WidgetInputText,
        select: WidgetInputSelect,
        radio: WidgetInputRadio,
        checkbox: WidgetInputCheckbox,
        switch: WidgetInputSwitch
    }
    const componentItem = computed(() => store[props.type] || store.text);

    const {state, input} = useInputState(props.name, props.validation);

    watch(() => props.modelValue, (a, b) => {
        if (a === b) return;
        input.value = props.modelValue
    }, {
        immediate: true
    })


</script>

<style>
    .widget-input__label{
        color: #333;
        font-size: 13px;
        margin: 4px 0;
    }
</style>
