<template>
    <component
        :is = "componentItem"

        :modelValue = "state.value"
        @update:modelValue = "v => input.change(v)"

        :label = "props.label"
        :disabled = "state.disabled"
        :errors = "state.errors"
    />
</template>

<script setup lang="ts">

    import {computed, withDefaults} from "vue";

    import WidgetInputText from "./inputs/widget-input-text.vue";
    import useInputState from "../hooks/use-input-state";

    interface Props {
        type: string,
        name: string,
        label?: string,
        validation?: any[]
    }

    const props = withDefaults(defineProps<Props>(), {
        validation: () => []
    })

    const store = {
        text: WidgetInputText
    }
    const componentItem = computed(() => store[props.type] || store.text);

    const {state, input} = useInputState(props.name, props.validation);



</script>

<style scoped>

</style>
