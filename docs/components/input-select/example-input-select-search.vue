<template>
	<input-field type = "select" :options = "arrayPets"
	label = "Pets"
/>
</template>
<script setup>
import {InputField} from "./../../../plugin/index";

const arrayPets = [
	{ value: 'F', label: 'Fish' },
	{ value: 'C', label: 'Cat'  },
	{ value: 'D', label: 'Dog' },
	{ value: "S", label: "Snake" },
	{ value: "M", label: "Mouse" },
	{ value: "P", label: "Parrot"},
	{ value: "B", label: "Bear" }
]
</script>