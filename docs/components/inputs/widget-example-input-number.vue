<template>
	<input-field label = "Age" type = "number" v-model = "value" name = "age"/>
	<p>Value: {{value}}</p>
</template>

<script setup>
import {InputField} from "../../../plugin";
import {ref} from "vue";

const value = ref(0);
</script>

<style scoped>

</style>
