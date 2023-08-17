<template>
	<input-field type = "single-checkbox"  v-model = "value" label = "Use Password"/>
	<p>Value: {{value}}</p>
</template>

<script setup>
import {InputField} from "../../../src";
import {ref} from "vue";

const value = ref(false);

</script>
<style scoped>

</style>
