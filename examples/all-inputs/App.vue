<template>
	<div>
		<input-field name = "username"/>
		<input-field name = "username" label = "With label"/>
		<input-field name = "username" label = "Disabled" disabled/>
		<input-field name = "username" label = "Only numeric char(modify)" :modify = "modifyOnlyChar"/>
		<input-field name = "username" label = "Size with symbol 'M'" :modify = "modifyOnlyChar" :pretty = "addPrettySymbol('M')"/>
		<input-field name = "username" label = "Error" :errors = "['Some mistake']"/>
		<input-field name = "username" label = "Error array" :errors = "['Some mistake', 'Length more then 5']"/>
		<input-field name = "username" label = "Prefix" prefix = "Login:"/>
		<input-field name = "username" label = "Placeholder" placeholder = "Write something"/>
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