<template>
	<div class="container-examples">

		<form-field :name="name" label = "Username"/>
		<widget-composite/>
		<button @click = "change">changed</button>

		<div :key = "count">{{values}}</div>
	</div>
</template>

<script setup lang='ts'>
import Form from "../../../src/classes/Form";
import FormField from "./../../../src/widgets/form-field.vue";
import {ref} from "vue";
import WidgetComposite from "./widget-composite.vue";

const form = new Form({
	name: "main"
});

window.form = form

const count = ref(0);
setInterval(() => count.value++, 50);
const values = ref(form.values);

const name = ref('username');

function change() {
	name.value = name.value === 'username' ? 'age' : 'username';
}

</script>

<style>

</style>
