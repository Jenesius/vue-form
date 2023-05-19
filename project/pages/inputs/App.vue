<template>
	<div class="container-examples">
		<input-field type = "single-checkbox" name = "test" label = "Test" 	/>
		<input-field type = "text" name = "test" label = "Test" prefix = "V89"	required/>
		<input-field type = "text" name = "test" label = "Test" prefix = "V89"	disabled/>
	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form} from "../../../plugin";

const form = new Form();

form.setValues({
})

form.validate()

window.form = form;

</script>

<style>

</style>
