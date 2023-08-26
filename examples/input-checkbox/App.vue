<template>
	<div>
		<form-field name = "checkbox" type = "checkbox" :options = "optionsCheckbox"/>
		<form-field name = "checkbox" type = "checkbox" label = "With label" :options = "optionsCheckbox"/>
		<form-field name = "checkbox" type = "checkbox" label = "Disabled" disabled :options = "optionsCheckbox"/>
		<form-field name = "checkbox" type = "checkbox" label = "With Error" :errors = "['Some mistake']" :options = "optionsCheckbox"/>

	</div>
</template>

<script setup>
import {Form, FormField} from "../../src";

const form = new Form();
const optionsCheckbox = [
	{
		label: "Red",
		value: 'r'
	},
	{
		label: "Green",
		value: 'g'
	},
	{
		label: "Yellow",
		value: 'y'
	}
]
</script>

<style scoped>

</style>