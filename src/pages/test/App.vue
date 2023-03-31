<template>
	<div class="container-examples">

		<input-field type = "text" name = "sun" required label = "Username" disabled/>

		<input-field type = "text" name = "sun" required label = "Username"/>

		<input-field type = "text" name = "sun" label = "Username"/>

		<input-field type = "text" name = "sun" label = "Username" prefix = "MMM" :modify = "test" max-length = 4 />
		<input-field type = "text" name = "sun" label = "Username" prefix = "MMM" :modify = "test" maxlength = 2 />


	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form} from "../../../plugin";
import {onMounted, ref} from "vue";

const form = new Form();


onMounted(() => setTimeout(() => form.validate(), 1000))

function test() {
	throw new Error('test')
}


window.form = form

</script>

<style>

</style>
