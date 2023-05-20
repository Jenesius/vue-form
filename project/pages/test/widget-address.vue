<template>
	<div>
		<h3>Address</h3>
		<form-field name="city" label = "City"/>
		<form-field name="country" label = "Country"/>
		<form-field name="details" label = "Details"/>
		<form-field name="region" label = "Region"/>
	</div>
</template>

<script setup>
import FormField from "./../../../src/widgets/form-field.vue";
import Form from "./../../../src/classes/Form";

const form = new Form({
	name: "address"
})

</script>

<style scoped>

</style>