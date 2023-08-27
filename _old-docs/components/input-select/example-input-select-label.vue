<template>
	<input-field type = "select" :options = "arrayPets"
	label = "Pets"
	placeholder = "Select favorite pet"
/>
</template>
<script setup>
import {InputField} from "./../../../src/index";

const arrayPets = [
	{ value: 'F', label: 'Fish' },
	{ value: 'C', label: 'Cat'  },
	{ value: 'D', label: 'Dog' }
]
</script>