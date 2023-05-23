<template>
	<div class="container-examples">

		<form-field :name="name" label = "Username"/>
		<widget-composite/>
		<widget-address/>
		<button @click = "change">changed</button>
		<button @click = "clean">clean values</button>

		<button @click = "setDefaultValues">set default values</button>

		<div :key = "count">{{count}}</div>
	</div>
</template>

<script setup lang='ts'>
import Form from "../../../src/classes/Form";
import FormField from "./../../../src/widgets/form-field.vue";
import {ref} from "vue";
import WidgetComposite from "./widget-composite.vue";
import WidgetAddress from "./widget-address.vue"
import copyObject from "./../../../src/utils/copy-object";

const form = new Form({
	name: "main"
});

window.form = form

const count = ref(0);
setInterval(() => {
	count.value = copyObject(form.values);
}, 50);

const name = ref('username');

function change() {
	name.value = name.value === 'username' ? 'age' : 'username';
}
function clean() {
	form.cleanValues();
}
function setDefaultValues() {
	return form.cleanValues({
		username: "Jenesius",
		"coordinate.x": "123"
	})
}

</script>

<style>

</style>
