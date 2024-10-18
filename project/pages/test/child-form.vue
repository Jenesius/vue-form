<script setup lang="ts">

import {useFormValues, Form, FormField} from "../../../src/index";


const form = new Form({
	name: "child"
})
const values = useFormValues(form);
</script>

<template>
	<div class="container">
		<form-field name="username" label="username"/>
		{{ values }}
	</div>
</template>

<style scoped>
.container {
	padding: 20px;
	border: 2px solid black;
}
</style>