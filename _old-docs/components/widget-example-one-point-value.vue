<template>
    <input-field name = "address.city" label = "Address.City"/>
    <input-address name = "address"/>
</template>

<script setup>
    import {Form, InputField} from "../../src";
    import InputAddress from "./../../_src/components/input-address.vue";

    const form = new Form()

</script>

<style scoped>

</style>
