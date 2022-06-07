<template>
    <component
        :is = "componentItem"

        :modelValue = "state.value"
        @update:modelValue = "test"

        :label = "label"
        :disabled = "state.disabled"
    />
</template>

<script setup lang="ts">

    import {computed} from "vue";

    import WidgetInputText from "./inputs/widget-input-text.vue";
    import useInputState from "../hooks/use-input-state";

    const props = defineProps<{
        type: string,
        name: string,
        label?: string
    }>()

    const store = {
        text: WidgetInputText
    }
    const componentItem = computed(() => store[props.type] || store.text);

    const {state, input} = useInputState(props.name);


    function test(a){

        input.change(a);
    }

</script>

<style scoped>

</style>
