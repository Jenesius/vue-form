<template>
	<div class="container">
		<div>
			<h2>Values</h2>
			<pre class="container-values">{{ JSON.stringify(values, undefined, 4) }}</pre>
		</div>

		<div class="wrap-app ">
			<input-field type="select" name = "sex" :options = "sexOptions"/>
			<input-field type = "select" name = "language" :options = "languageOptions"/>


			<input-field type= "select" name="programming-language" :options = "programLanguageOptions" :hidden-values = "['2','1']"/>
			<input-field type = "select" name = "year" :options = "yearOptions" label = "Year"/>

			<button class="button" @click="form.cleanValues()">Clean Form</button>
		</div>
	</div>
</template>

<script setup lang='ts'>

import {Form, InputField, useFormValues} from "../../src";

const form = new Form();
const values = useFormValues(form);

/*JUST ENUMS*/
const sexOptions = {
	0: "female",
	1: "male"
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
const programLanguageOptions = {
	1: "JavaScript",
	2: "TypeScript",
	3: "Assembler",
	4: "C++"
}

const offset = 1900;

const yearOptions = Array.from({length: 200}).map((x, index) => ({
	label: offset + index + '',
	value: offset + index
}))

</script>

<style>
.container {
	display: flex;
}

@media screen and (max-width: 768px) {
	.container {
		flex-direction: column;
	}
}

.wrap-app {
	width: 100%;
	max-width: 600px;
	margin: auto auto;
	display: grid;
	gap: 20px;
}

body {
	font-family: sans-serif;
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
