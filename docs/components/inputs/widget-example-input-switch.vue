<template>
    <input-field label = "Dark site theme" type = "switch" v-model = "value"/>
    <p>Value: {{value}}</p>
</template>

<script setup>
    import {InputField} from "../../../plugin";
    import {ref} from "vue";

    const value = ref(null);


</script>

<style scoped>

</style>
