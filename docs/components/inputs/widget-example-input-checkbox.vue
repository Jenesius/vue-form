<template>
    <input-field type = "checkbox" :options = "array" v-model = "value"/>
    <p>Value: {{value}}</p>
</template>

<script setup>
    import {InputField} from "../../../plugin";
    import {ref} from "vue";

    const value = ref(null);
    const array = [
        {
            title: 'Buy Car',
            value: 'car'
        },
        {
            title: 'Donate',
            value: 'donate'
        },
    ]

</script>

<style scoped>

</style>
