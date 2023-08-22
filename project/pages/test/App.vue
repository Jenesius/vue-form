<template>
	<div class="container-examples">
		<div :key = "values">Values: {{values}}</div>

		<div :key = "changes">Changes: {{changes}}</div>
		<div :key = "pureValue">Pure values: {{pureValue}}</div>
		<div :key = "pureAvailabilities">Pure av: {{pureAvailabilities}}</div>
		<form-field type = "country" name = "country" label = "Country" />
		<form-field type = "tel" name = "phone" label = "Phone" required />
		<form-field type = "date" name = "birthday" label = "Bithday" />


		<form-field :name="name" :label = "name === 'username' ? 'Username' : 'Age'"/>
		<form-field name="username" label = "Username" />
		<form-field name="name" label = "Name"/>
		<widget-address/>
        <form-field name="address.city.index" label = "City Index" />
		<button @click = "change">change field name</button>
		<button @click = "clean">clean values</button>

		<button @click = "setDefaultValues">set default values</button>



	</div>
</template>

<script setup lang='ts'>
import Form from "../../../src/classes/Form";
import FormField from "./../../../src/widgets/form-field.vue";
import {ref} from "vue";
import WidgetAddress from "./widget-address.vue"
import copyObject from "./../../../src/utils/copy-object";

// @ts-ignore
const form = window.form = new Form({
	name: "main",
	parent:false
});


setInterval(() => {
	if (!form) return;
	values.value = copyObject(form?.values);
	changes.value = copyObject(form.changes);
	pureValue.value = copyObject(form.TEST_PURE_VALUE);
    pureAvailabilities.value = copyObject(form.TEST_PURE_AVAILABILITIES)
}, 50);


form.oninput('birthday', v => {
	console.log(v)
})
const values = ref(0);
const changes = ref({});
const pureValue= ref({});
const pureAvailabilities = ref({})

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
