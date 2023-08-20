<template>
	<input-field
		type = "select" :options = "accountType"
	/>
</template>

<script setup lang = "ts">

import {InputField} from "../../../src";



const accountType = [
	{ value: "p", title: "Person" },
	{ value: "o", title: "Organization" },
	{ value: "of", title: "Officer" },
	{ value: "a", title: "Anonymous" },
]
</script>

<style scoped>

</style>