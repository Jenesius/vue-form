<template>
    <input-field name = "address.city" label = "Address.City"/>
    <input-address name = "address"/>
</template>

<script setup>
    import {Form, InputField} from "../../plugin";
    import InputAddress from "./../../src/components/v2/input-address.vue";

    const form = new Form()

</script>

<style scoped>

</style>
