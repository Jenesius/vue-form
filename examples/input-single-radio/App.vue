<template>
	<div>
		<form-field name = "checkbox" type = "single-radio" />
		<form-field name = "checkbox" type = "single-radio" label = "With label" />
		<form-field name = "checkbox" type = "single-radio" label = "Disabled" disabled />
		<form-field name = "checkbox" type = "single-radio" label = "With Error" :errors = "['Some mistake']" />

	</div>
</template>

<script setup>
import {Form, FormField} from "../../src";

const form = new Form();
</script>

<style scoped>

</style>