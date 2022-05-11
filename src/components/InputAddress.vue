<template>
    <div class = "input-address">

        <p class = "input-address__title">Address</p>

        <input-field name = "country"/>
        <input-field name = "city"/>

    </div>
</template>

<script setup lang = "ts">
    /* eslint-disable */

    import InputField from "@/components/InputField.vue";
    import {Form} from "../../plugin/classes/Form";
    import {inject, defineProps} from "vue";

    const props = defineProps<{
        name: string
    }>()
    const parentForm = inject(Form.PROVIDE_NAME) as Form;


    function init() {
        return new Form({
            name: props.name,
            composition: true
        });
    }

    const form = parentForm.restoreDependence(props.name) as Form || init();

</script>

<style scoped>
    .input-address{
        display: flex;
        flex-direction: column;

        padding: 10px;
        gap: 10px;
        background-color: #f8f8f8;
        border-radius: 4px;
    }
    .input-address__title{
        margin: 0;
        color: #414040;
        font-size: 18px;
    }
</style>
