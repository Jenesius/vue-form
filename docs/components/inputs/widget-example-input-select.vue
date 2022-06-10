<template>
    <input-field type = "select" :options = "array" v-model = "value"/>
    <p>Value: {{value}}</p>
</template>

<script setup>
    import {InputField} from "../../../plugin";
    import {ref} from "vue";

    const value = ref(null);
    const array = [
        {
            title: 'Red color',
            value: 'red'
        },
        {
            title: 'Green color',
            value: 'green'
        },
        {
            title: 'Blue color',
            value: 'blue'
        },
        {
            title: 'Transparent',
            value: null
        }
    ]

</script>

<style scoped>

</style>
