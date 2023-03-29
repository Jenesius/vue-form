<template>
	<input-field type = "select" :options = "arrayPets" />
</template>
<script setup>
import {InputField} from "./../../../plugin/index";

const arrayPets = [
	{ value: 'F', label: 'Fish' },
	{ value: 'C', label: 'Cat'  },
	{ value: 'D', label: 'Dog' }
]
</script>