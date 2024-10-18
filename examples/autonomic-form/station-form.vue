<script setup lang="ts">
import {Form, FormField} from "../../src";

const form = new Form({
	name: "Station",
	autonomic: true
})

</script>

<template>
	<div>
		<h2>Station:</h2>
		<form-field name = "name" label = "Name"/>
		<form-field name = "code" label = "Station Code" />
		<form-field name = "bandwidth" label = "Available bandwidth" />
	</div>
</template>
