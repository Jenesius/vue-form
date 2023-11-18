<template>
	<div class="container">
		<div class="wrap-app">
			<h2>Disable/Enable Form</h2>
			<input-field name="username" label="Username"/>
			<input-field name="country.code" label="Country Code" type="select" :options="languageOptions"/>
			<input-field name="country.name" label="Country Name"/>
			<button class="button" @click="handleMain">{{ mainButton }}</button>
			<button class="button" @click="handleUsername">Disable/Enable username</button>
			<button class="button" @click="handleCountry">Disable/Enable country</button>
		</div>
	</div>
</template>

<script setup lang='ts'>

import {Form, InputField, useFormState} from "../../src";
import {computed} from "vue";

const form = new Form();
const formState = useFormState(form);
const mainButton = computed(() => (formState.disabled ? 'Enable' : 'Disable') + ' Form')

function handleMain() {
	(form.disabled) ? form.enable() : form.disable()
}

function handleUsername() {
	(form.checkFieldDisable('username')) ? form.enable('username') : form.disable('username')
}

function handleCountry() {
	(form.checkFieldDisable('country')) ? form.enable('country') : form.disable('country')
}


const languageOptions = {
	1: "English",
	2: "Dutch",
	3: "Chinese",
	4: "Portuguese",
	5: "Spanish",
	6: "Italian",
	7: "Russian"
}


</script>

<style scoped>
.container {
	display: flex;
}

.wrap-app {
	width: 100%;
	max-width: 600px;
	margin: auto auto;
}

.padding_10 {
	padding: 10px 0;
}

.container-values {
	width: 300px;
	padding: 20px 0;
}

.button {
	cursor: pointer;
	padding: 6px 10px;
	border: 1px solid lightgray;
	background-color: white;
	transition: transform;
}

.button:hover {
	transform: scale(.96);
}
</style>
