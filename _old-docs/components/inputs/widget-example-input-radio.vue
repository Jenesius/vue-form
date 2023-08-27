<template>
    <input-field label = "Pet" type = "radio" :options = "array" v-model = "value"/>
    <p>Value: {{value}}</p>
</template>

<script setup>
    import {InputField} from "../../../src";
    import {ref} from "vue";

    const value = ref(null);
    const array = [
        {
            title: 'Dog',
            value: 'dog'
        },
        {
            title: 'Cat',
            value: 'cat'
        },
        {   // It's a joke! Just humor!
            title: 'Wife',
            value: 'wife'
        }
    ]

</script>

<style scoped>

</style>
