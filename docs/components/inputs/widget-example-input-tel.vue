<template>
<input-field label = "Phone" type = "tel" v-model = "value"/>
<p>Value: {{value}}</p>
</template>

<script setup>
import {InputField} from "../../../src";
import {ref} from "vue";

const value = ref(null);

</script>

<style scoped>

</style>
