<template>
	<div class="container-examples">
		<input-field type = "single-checkbox" name = "test" label = "Test" 	/>
	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form} from "../../../plugin";

const form = new Form();

form.setValues({
	test: false
})
form.disable()

</script>

<style>

</style>
