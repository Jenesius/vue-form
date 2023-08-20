<template>
    <input-field type = "text" v-model = "value" />
    <p>Value: {{value}}</p>
</template>

<script setup>
    import {InputField} from "../../../src/";
    import {ref} from "vue";

    const value = ref();
</script>

<style scoped>

</style>
