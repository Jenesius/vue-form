<template>
    <p class = "street-title">Street</p>
    <input-field name = "name" label = "Name"/>
    <input-field name = "index" label = "Index"/>
</template>

<script setup lang="ts">
    import InputField from "../../plugin/widgets/input-field.vue";
    import {Form} from "../../src";

    const props = defineProps<{
        name: string
    }>()

    const form = new Form({name: props.name})

</script>

<style scoped>
    .street-title{
        margin: 10px 0 5px;
        font-weight: bold;
    }
</style>
