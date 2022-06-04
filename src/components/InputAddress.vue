<template>
    <div class = "input-address" v-if = "!formState.hidden">

        <p class = "input-address__title">Address</p>

        <input-field name = "country"/>
        <input-field name = "city"/>

    </div>
</template>

<script setup lang = "ts">
    import InputField from "@/components/InputField.vue";
    import {FormOld} from "../../plugin";
    import useFormState from "../../plugin/hooks/useFormState";
    import buildDepend from "../../plugin/methods/build-depend";

    const props = defineProps<{
        name: string
    }>()

    const form = buildDepend(props.name, () => new FormOld({name:props.name}))
    const formState = useFormState(form);

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
