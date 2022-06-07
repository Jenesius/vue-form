<template>
    <div>
        <p>Address</p>
        <div class = "flex">
            <span>city</span>
            <new-city-field name = "city"/>
        </div>

        <div class = "flex">
            <span>description</span>
            <new-input-field name = "description"/>
        </div>

        <div class = "flex">
            <span>code.title</span>
            <new-input-field name="code.title"/>
        </div>



    </div>
</template>

<script setup lang="ts">

    import NewInputField from "@/components/v2/new-input-field.vue";
    import FormProxy from "../../../plugin/classes/FormProxy";
    import {onUnmounted} from "vue";
    import NewCityField from "@/components/v2/new-city-field.vue";

    const props = defineProps<{
        name: string
    }>()

    const {input, state} = useCState(props.name);

    function useCState(name: string) {

        const form = new FormProxy({name: props.name});

        onUnmounted(() => {
            form.parentForm?.unsubscribe(form);
        })

        return {}
    }


</script>

<style scoped>

</style>
