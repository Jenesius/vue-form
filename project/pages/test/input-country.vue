<template>
	<div>
		<input-field v-bind = "$attrs" type = "select" :options = "options" />
	</div>
</template>

<script setup>
import {InputField} from "../../../src/index";

const options = Array.from({length: 20}, (x, index) => ({
	value: index,
	label: `Test-${index}`
}))

</script>

<style scoped>

</style>