<template>
	<div class="container-examples">
		<div>
			<form-field name = "mainAddress" type = "address" />
			<form-field name = "mainAddress.city" label = "Just city" />
		</div>
		{{values}}
	</div>
</template>

<script setup lang='ts'>
import {Form, useFormValues, InputField} from "../../../src";
import FormField from "./../../../src/widgets/form-field.vue";

const form = new Form();

const values = useFormValues(form);
form.validate();

</script>

<style>
	.container-examples {
		display: grid;
		gap: 10px;
	}
</style>
