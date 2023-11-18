<template>
	<div class = "input-address">
		<form-field name = "country" label = "Address country"/>
		<form-field name = "city" label = "Address city"/>
	</div>
</template>

<script setup lang = "ts">
import {Form, FormField} from "./../../../src/index";

const props = defineProps<{
	name: string,
}>()

const form = new Form({
	name: props.name
})
</script>

<style scoped>

.input-address {
	display: grid;
	gap: 10px;
}

</style>