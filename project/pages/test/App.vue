<template>
	<div class="container-examples">
		<div :key = "values">Values: {{values}}</div>

		<div :key = "changes">Changes: {{changes}}</div>
		<div :key = "pureValue">Pure values: {{pureValue}}</div>
		<div :key = "pureAvailabilities">Pure av: {{pureAvailabilities}}</div>

		<input-field name = "birthday" type = "date" label = "Placeholder"  />

		<input-field name = "birthday" type = "date" label = "Other mask" mask = "MM/DD/YYYY" :handlers = "[testFrom, testTo]"/>


	</div>
</template>

<script setup lang='ts'>
import Form from "../../../src/classes/Form";
import {ref} from "vue";
import copyObject from "./../../../src/utils/copy-object";
import {InputField} from "../../../src/index";
import DateController from "../../../src/controllers/date-controller";

// @ts-ignore
const form = window.form = new Form({
	name: "main",
	parent:false
});
const show = ref(false);

setInterval(() => {
	if (!form) return;

	values.value = copyObject(form?.values);
	changes.value = copyObject(form.changes);
	pureValue.value = copyObject(form.TEST_PURE_VALUE);
	pureAvailabilities.value = copyObject(form.TEST_PURE_AVAILABILITIES)
}, 50);




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

function testFrom(date: unknown) {
	if (typeof date !== 'string') return null;
	return new Date(date)
}

function testTo(str?: string) {
	if (typeof str !== 'string') return null;

	const p = DateController.ConvertToDate(str, "MM/DD/YYYY");
	if (!p) return null;

	return DateController.GetPrettyDate(p, 'YYYY-MM-DD')
}

</script>

<style>

</style>
