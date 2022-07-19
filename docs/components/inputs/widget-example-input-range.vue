<template>
<input-field label = "Volume" type = "range" v-model = "value"/>
<p>Value: {{value}}</p>
</template>

<script setup>
import {InputField} from "../../../plugin";
import {ref} from "vue";

const value = ref(0);

</script>

<style scoped>

</style>
