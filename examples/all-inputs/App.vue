<template>
	<div>
		<h2>Input Text</h2>
		<input-field name = "username"/>
		<input-field name = "username" label = "With label"/>
		<input-field name = "username" label = "Disabled" disabled/>
		<input-field name = "username" label = "Only numeric char(modify)" :modify = "modifyOnlyChar"/>
		<input-field name = "username" label = "Size with symbol 'M'" :modify = "modifyOnlyChar" :pretty = "addPrettySymbol('M')"/>
		<input-field name = "username" label = "Error" :errors = "['Some mistake']"/>
		<input-field name = "username" label = "Error array" :errors = "['Some mistake', 'Length more then 5']"/>
		<input-field name = "username" label = "Prefix" prefix = "Login:"/>
		<input-field name = "username" label = "Placeholder" placeholder = "Write something"/>

		<h2>Input Textarea</h2>
		<input-field name = "description" type = "textarea"/>
		<input-field name = "description" type = "textarea" label = "With label"/>
		<input-field name = "description" type = "textarea" label = "Disabled" disabled/>
		<input-field name = "description" type = "textarea" label = "With Error" :errors = "['Some mistake']"/>
		<input-field name = "description" type = "textarea" label = "Placeholder" placeholder = "Add information about user." />
		<input-field name = "description" type = "textarea" label = "Auto resize" autoresize  />

		<h2>Input Tel</h2>
		<input-field name = "phone" type = "tel"/>
		<input-field name = "phone" type = "tel" label = "With label"/>
		<input-field name = "phone" type = "tel" label = "Disabled" disabled/>
		<input-field name = "phone" type = "tel" label = "With Error" :errors = "['Some mistake']"/>
		<input-field name = "phone" type = "tel" label = "Placeholder" placeholder = "Add information about user." />

		<h2>Input Switch</h2>
		<input-field name = "switch" type = "switch"/>
		<input-field name = "switch" type = "switch" label = "With label"/>
		<input-field name = "switch" type = "switch" label = "Disabled" disabled/>
		<input-field name = "switch" type = "switch" label = "With Error" :errors = "['Some mistake']"/>
	</div>
</template>

<script setup lang = "ts">
import InputField from "../../plugin/widgets/input-field.vue";
import {Form} from "../../plugin";

const form = new Form();
function modifyOnlyChar(a: string) {
	return a.replace(/\D/g, '');
}
function addPrettySymbol(symbol: string) {
	return (value: unknown) => {
		if (typeof value !== 'string') return '';

		return `${value} ${symbol}`;
	}
}

</script>

<style scoped>

</style>