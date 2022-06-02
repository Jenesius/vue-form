<template>
    <div>
        <p>Address</p>
        <new-input-field name = "city"/>
        <new-input-field name = "description"/>
    </div>
</template>

<script setup lang="ts">
    import {Form} from "../../../plugin";
    import NewInputField from "@/components/v2/new-input-field.vue";

    const props = defineProps<{
        name: string
    }>()

    const {input, state} = useCState(props.name);

    function useCState(name: string) {

        const form = new Form({name: props.name});

        setInterval(() => console.log(form), 1000);
        return {}
    }

</script>

<style scoped>

</style>
