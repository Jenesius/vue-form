<script setup lang="ts">

import {useFormValues, Form, FormField} from "../../../src/index";
import ParentForm from "./parent-form.vue";

const form = new Form({
	name: "grand"
})
const values = useFormValues(form);

// @ts-ignore
window.theForm = form;
</script>

<template>
	<div class="container">
		<form-field name="username" label="username"/>
		{{ values }}
		<parent-form/>
	</div>
</template>

<style scoped>
.container {
	padding: 20px;
	border: 2px solid black;
}
</style>