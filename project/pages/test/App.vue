<template>
	<div class="container-examples">
		<div :key = "values">Values: {{values}}</div>
		<form-field type = "country" name = "a1" label = "tset"/>
		<button @click = "show = !show">test</button>

		<test-form  v-if = "show"/>

        <form-field name="created" type = "date" label = "Created" />
		<form-field name="created" type = "date"  format = "test" label = "Test Format" />

		<form-field type = "country" name = "a1" label = "tset"/>
		<form-field type = "country" name = "a2" label = "Super"/>

		<div style = "background-color: #bac7f8; padding: 10px">
			<p>Local date: {{localDate}}</p>
			<input-field name = "created" type = "local-date" />
		</div>

        <form-field name="created" type = "date" mask = "YYYY-MM-DD" label = "Ceated English" placeholder = "Введите дату создания"/>

        <form-field name="address.city" label = "Address city" />

		<form-field :name="name" label = "Username" placeholder = "Username"/>
		<form-field label = "TEST" v-model = "test"/>
		<p>Test: {{test}}</p>
		<form-field name="username.name.jenesius" label = "Username"/>
		<form-field name="name" label = "Name"/>
		<widget-composite/>
		<widget-address/>
        <form-field name="address.city.index" label = "City Index" />
		<button @click = "change">changed</button>
		<button @click = "clean">clean values</button>

		<button @click = "setDefaultValues">set default values</button>



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
import InputField from "../../../src/widgets/form-field.vue";
import TestForm from "./test-form.vue";

const form = new Form({
	name: "main",
	parent:false
});

window.form = form
const show = ref(false);
const localDate = ref("");

const values = ref(0);
setInterval(() => {
	values.value = copyObject(form.values);
	changes.value = copyObject(form.changes);
	pureValue.value = copyObject(form.TEST_PURE_VALUE);
    pureAvailabilities.value = copyObject(form.TEST_PURE_AVAILABILITIES)
}, 50);
const test = ref("");
window.test = test

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
