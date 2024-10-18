<script setup lang="ts">

import {useFormValues, Form, FormField} from "../../../src/index";
import ChildForm from "./child-form.vue";


const form = new Form({
	name: "parent"
})
const values = useFormValues(form);
</script>

<template>

	<div class="container">
		<form-field name="username" label="username"/>
		{{ values }}

		<child-form/>
	</div>
</template>

<style scoped>
.container {
	padding: 20px;
	border: 2px solid black;
}
</style>