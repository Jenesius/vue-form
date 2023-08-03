<template>
	<div class="container-examples">
		<input-field type = "single-checkbox" name = "check" label = "Test" 	/>
		<input-field type = "single-checkbox" name = "check-with-values" label = "Values" :values = "['A', 'R']" />
		<input-field type = "text" name = "test" label = "Test" prefix = "V89"	required/>
		<input-field type = "text" name = "test" label = "Test" prefix = "V89"	disabled/>
		{{values}}
	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form, useFormValues} from "../../../plugin";

const form = new Form();

const values = useFormValues(form);

form.validate()

window.form = form;

</script>

<style>

</style>
