<template>
	<div>
		<p>User</p>
		<input-field name = "name" label = "name"/>
		<input-field type = "number" name = "age" label = "age" required/>
	</div>
</template>

<script setup lang = "ts">
	import {Form, InputField} from "../../src";

	const props = defineProps<{
		name: string
	}>()
	
	const form = new Form({name: props.name});

</script>

<style scoped>

</style>