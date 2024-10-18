<template>
	<div class="container">
		<form-field name = "username" label = "Username"/>

		<station-form />

		<button @click = "showChanges">Changes</button>
		<button @click = "showChanges" v-if = "formState.changed">Save</button>
	</div>
</template>

<script setup lang='ts'>

import {Form, FormField, useFormState} from "../../src";
import StationForm from "./station-form.vue";

const form = new Form();
const formState = useFormState(form);
// @ts-ignore
window.theForm = form;
function showChanges() {
	console.log(form.changes);
}
</script>

<style scoped>

</style>
