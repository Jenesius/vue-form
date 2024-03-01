<template>
	<div class="container">
		<div>
			<h2>Values</h2>
			<pre class="container-values">{{ JSON.stringify(values, undefined, 4) }}</pre>
		</div>

		<div class="wrap-app ">
			<select name="select">
				<!--Supplement an id here instead of using 'name'-->
				<option value="value1">Значение 1</option>
				<option value="value2" selected>Значение 2</option>
				<option value="value3">Значение 3</option>
				<option value="value3">Значение 4</option>
				<option value="value3">Значение 5</option>
			</select>
			<select name="select" multiple size =10>
				<!--Supplement an id here instead of using 'name'-->
				<option value="value1">Значение 1</option>
				<option value="value2">Значение 2</option>
				<option value="value3">Значение 3</option>
				<option value="value3">Значение 4</option>
				<option value="value3">Значение 5</option>
				<option value="value3">Значение 6</option>
				<option value="value3">Значение 7</option>
				<option value="value3">Значение 8</option>
				<option value="value3">Значение 9</option>
			</select>
			<input-field type="select" name = "sex" :options = "sexOptions"/>
			<input-field type = "select" name = "language" :options = "languageOptions"/>
			<input-field type = "select" name = "languages" :options = "languageOptions" multiple label = "Multi languages"/>
			<input-field type = "select" name = "languages" :options = "languageOptions" multiple label = "Multi languages" disabled/>
			<input-field type = "select" name = "languages" :options = "languageOptions" multiple label = "Multi languages" limit = "2"/>


			<input-field type= "select" name="programming-language" :options = "programLanguageOptions" :hidden-values = "['2','1']"/>
			<input-field type = "select" name = "year" :options = "yearOptions" label = "Year"/>
			<input-field type = "select" name = "year" :options = "yearOptions" label = "Year"/>

			<button class="button" @click="form.cleanValues()">Clean Form</button>
		</div>
	</div>
</template>

<script setup lang='ts'>

import {Form, InputField, useFormValues} from "../../src";

const form = new Form();
// @ts-ignore
window.form = form
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

<style scoped>
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
