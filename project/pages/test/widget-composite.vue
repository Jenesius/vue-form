<template>
	<div class = "widget-composite">
		<p>Coordinate</p>
		<form-field name="x"/>
		<form-field name="y"/>

		<div :key = "count">
			Value: {{values}}
		</div>
	</div>
</template>

<script setup lang = "ts">
import FormField from "./../../../src/widgets/form-field.vue";
import Form from "./../../../src/classes/Form";
import {ref} from "vue";

const form = new Form({
	name: 'coordinate'
})

const count = ref(0);
setInterval(() => {
	count.value++;
	values.value = form.values;
}, 50);

const values = ref(form.values);



</script>

<style scoped>
	.widget-composite{
		padding: 5px;
		background-color: rgba(194, 154, 49, 0.13);
	}
</style>