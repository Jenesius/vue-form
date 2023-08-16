<template>
	<div>
		<input-field
			:options = "country"
			type = "select"
		/>
	</div>
</template>

<script setup lang = "ts">
import {InputField} from "../../../src";

const country = [
	{ label: "Albania", value: '1' },
	{ label: "Brazil", value: '2' },
	{ label: "China", value: '3' },
	{ label: "Egypt", value: '4' },
	{ label: "Libya", value: '5' },
	{ label: "Japan", value: '6' },
	{ label: "Nigeria", value: '7' },
	{ label: "Spain", value: '8' },
]
</script>

<style scoped>

</style>