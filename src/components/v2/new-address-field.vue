<template>
    <div>
        <p>Address</p>
        <new-input-field name = "city"/>
        <new-input-field name = "description"/>
    </div>
</template>

<script setup lang="ts">

    import NewInputField from "@/components/v2/new-input-field.vue";
    import SimpleCompositeInput
        from "../../../plugin/classes/simple-composite-input";

    const props = defineProps<{
        name: string
    }>()

    const {input, state} = useCState(props.name);

    function useCState(name: string) {

        const form = new SimpleCompositeInput({name: props.name});

        return {}
    }



</script>

<style scoped>

</style>
