<template>
	<div class="container-examples">

        <form-field name="created" type = "date" label = "Created" />
        <form-field name="created" type = "date" mask = "mm-dd-yyyy" label = "Ceated English" />

        <form-field name="address.city" label = "Address city" />

		<form-field :name="name" label = "Username"/>
		<form-field name="username.name.jenesius" label = "Username"/>
		<form-field name="name" label = "Name"/>
		<widget-composite/>
		<widget-address/>
        <form-field name="address.city.index" label = "City Index" />
		<button @click = "change">changed</button>
		<button @click = "clean">clean values</button>

		<button @click = "setDefaultValues">set default values</button>


		<div :key = "values">Values: {{values}}</div>
		<div :key = "changes">Changes: {{changes}}</div>
		<div :key = "pureValue">Pure values: {{pureValue}}</div>
		<div :key = "pureAvailabilities">Pure av: {{pureAvailabilities}}</div>
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

const values = ref(0);
setInterval(() => {
	values.value = copyObject(form.values);
	changes.value = copyObject(form.changes);
	pureValue.value = copyObject(form.TEST_PURE_VALUE);
    pureAvailabilities.value = copyObject(form.TEST_PURE_AVAILABILITIES)
}, 50);

const address = new Form({
    name: "address",
    provide: false
})
form.subscribe(address)
window.address = address;

const addressCity = new Form({name: "address.city", provide: false})
form.subscribe(addressCity)
window.addressCity = addressCity

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

form.onavailable("address.country.city.street", newAvailability => {
    console.log("++++ address.country.city.street", newAvailability)
})
form.onavailable("address", newAvailability => {
    console.log("++++ address", newAvailability)
})
form.onavailable("user.name", newAvailability => {
    console.log("++++ user.name", newAvailability)
})

address.onavailable('city', newAvailability => {
    console.log("FROM ADDRESS", '++++ city', newAvailability)
})

</script>

<style>

</style>
