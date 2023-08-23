<template>
	<div class="container">
		<div class = "container-values">
			<pre style = "margin: 0"><code v-html = "prettyPrint.call(values)"></code></pre>
		</div>

		<div class="wrap-app">
			<div class = "container-navigation">
				<button class="button" @click="form.cleanValues()">Clean Form</button>
				<button class="button" @click="form.validate()">Validate</button>
			</div>
			<div class = "container-inputs">
				<input-field name="username" label="Username"/>
				<input-field name="gender" label="Gender" type="radio" :options="sexOptions"/>
				<input-field name="about" label="About yourself" type="textarea" class = "grid-full"/>

				<input-field name="age" label="Age" type="number"/>
				<input-field name="birthday" label="Birthday" type="date"/>
				<input-field name="language" label="Language" type="select" :options="languageOptions"/>

				<input-field name="mobile" type="tel" label="Mobile phone" required/>
				<input-field name="isProgrammer" label="You are programmer" type="switch" class="padding_10"/>

				<input-field name="programLanguages" label="Program language" type="checkbox"
							 :options="programLanguageOptions" v-if="computedIsProgrammer"/>
			</div>

		</div>
	</div>
</template>

<script setup lang='ts'>

import {ComputedValue, Form, InputField, useFormValues} from "../../src";

const form = new Form({name: "Simple Form"});
const computedIsProgrammer = ComputedValue(form, 'isProgrammer');
const values = useFormValues(form);

/*JUST ENUMS*/
const sexOptions = {
	0: "female",
	1: "male"
}
const languageOptions = {
	en: "English",
	de: "Dutch",
	ch: "Chinese",
	po: "Portuguese",
	sp: "Spanish",
	it: "Italian",
	ru: "Russian"
}
const programLanguageOptions = {
	js: "JavaScript",
	ts: "TypeScript",
	asm: "Assembler",
	cpp: "C++",
	py: 'Python'
}


function prettyPrint(this: object){
	var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
	var replacer = function(match, pIndent, pKey, pVal, pEnd) {
		var key = '<span class="json-key" style="color: brown">',
			val = '<span class="json-value" style="color: navy">',
			str = '<span class="json-string" style="color: olive">',
			r = pIndent || '';
		if (pKey)
			r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
		if (pVal)
			r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
		return r + (pEnd || '');
	};

	return JSON.stringify(this, null, 3)
	.replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
	.replace(/</g, '&lt;').replace(/>/g, '&gt;')
	.replace(jsonLine, replacer);
}
</script>

<style>
.container-inputs {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
}
.grid-full {
	grid-column: 1/3;
}
.container-navigation {
	display: flex;
	gap: 10px;
	padding: 20px 0;
}

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
