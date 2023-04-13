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
		<input-field name = "username" label = "Numeric" numeric/>
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

		<h2>Input Single Checkbox</h2>

		<input-field name = "single-checkbox" type = "single-checkbox"/>
		<input-field name = "single-checkbox" type = "single-checkbox" label = "With label"/>
		<input-field name = "single-checkbox" type = "single-checkbox" label = "Disabled" disabled/>
		<input-field name = "single-checkbox" type = "single-checkbox" label = "With Error" :errors = "['Some mistake']"/>

		<h2>Input Checkbox</h2>

		<input-field name = "checkbox" type = "checkbox" :options = "optionsCheckbox"/>
		<input-field name = "checkbox" type = "checkbox" label = "With label" :options = "optionsCheckbox"/>
		<input-field name = "checkbox" type = "checkbox" label = "Disabled" disabled :options = "optionsCheckbox"/>
		<input-field name = "checkbox" type = "checkbox" label = "With Error" :errors = "['Some mistake']" :options = "optionsCheckbox"/>


		<h2>Input Password</h2>

		<input-field name = "password" type = "password" />
		<input-field name = "password" type = "password" label = "With label" />
		<input-field name = "password" type = "password" label = "Disabled" disabled />
		<input-field name = "password" type = "password" label = "With Error" :errors = "['Some mistake']" />

		<h2>Input Number</h2>

		<input-field name = "number" type = "number" />
		<input-field name = "number" type = "number" label = "With label" />
		<input-field name = "number" type = "number" label = "Disabled" disabled />
		<input-field name = "number" type = "number" label = "With Error" :errors = "['Some mistake']" />

		<h2>Input Radio</h2>

		<input-field name = "radio" type = "radio" :options = "optionsCheckbox"/>
		<input-field name = "radio" type = "radio" label = "With label" :options = "optionsCheckbox"/>
		<input-field name = "radio" type = "radio" label = "Disabled" disabled :options = "optionsCheckbox"/>
		<input-field name = "radio" type = "radio" label = "With Error" :errors = "['Some mistake']" :options = "optionsCheckbox"/>

		<h2>Input Single Radio</h2>

		<input-field name = "single-radio" type = "single-radio"/>
		<input-field name = "single-radio" type = "single-radio" label = "With label"/>
		<input-field name = "single-radio" type = "single-radio" label = "Disabled" disabled/>
		<input-field name = "single-radio" type = "single-radio" label = "With Error" :errors = "['Some mistake']"/>

		<h2>Input Single Range</h2>

		<input-field name = "range" type = "range"/>
		<input-field name = "range" type = "range" label = "With label"/>
		<input-field name = "range" type = "range" label = "Disabled" disabled/>
		<input-field name = "range" type = "range" label = "With Error" :errors = "['Some mistake']"/>

		<h2>Input Select</h2>

		<input-field name = "select" type = "select" :options = "optionsCheckbox"/>
		<input-field name = "select" type = "select" label = "With label" :options = "optionsCheckbox"/>
		<input-field name = "select" type = "select" label = "With Placeholder" :options = "optionsCheckbox" placeholder = "Add information about user." />
		<input-field name = "select" type = "select" label = "Disabled" disabled :options = "optionsCheckbox"/>
		<input-field name = "select" type = "select" label = "With Error" :errors = "['Some mistake']" :options = "optionsCheckbox"/>

		<input-field name = "select1" type = "select" :options = "bigOptionsCheckbox"/>
		<input-field name = "select1" type = "select" label = "With label" :options = "bigOptionsCheckbox"/>
		<input-field name = "select1" type = "select" label = "Disabled" disabled :options = "bigOptionsCheckbox"/>
		<input-field name = "select1" type = "select" label = "With Error" :errors = "['Some mistake']" :options = "bigOptionsCheckbox"/>
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

const optionsCheckbox = [
	{
		label: 'test',
		value: 1
	},
	{
		label: 'test 2',
		value: 2
	},
	{
		label: 'test 3',
		value: 3
	}
]

const bigOptionsCheckbox = [0,1,2,3,4,5,6,7,8,9,10].map(value => ({value, label: `title ${value}`}))

</script>

<style scoped>

</style>