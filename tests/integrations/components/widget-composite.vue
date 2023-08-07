<template>
	<div>
		<form-field name="x"/>
		<form-field name="y"/>
	</div>
</template>

<script setup lang = "ts">
import FormField from "../../../src/widgets/form-field.vue";
import Form from "../../../src/classes/Form";

const form = new Form({
	name: 'coordinate'
})


</script>

<style scoped>

</style>