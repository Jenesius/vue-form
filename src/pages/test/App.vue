<template>
	<div class="container-examples">
		{{country}}
		<input-field v-model = "country" />
		<input-field v-model = "value" v-if = "isValue" />
		<button @click = "() => isValue = !isValue">toggle</button>


		<input-field type = "select" label = "Country" :options = "optionsCountry" name = "Country"/>

		<input-field type = "select" label = "City" :options = "optionsCity" name = "City" />
		<input-field type = "select" label = "City" :options = "optionsCity"  v-model = "inputModelValue"/>
		<input-field  label = "City"  :model-value = "inputModelValue"/>

		<input-field type = "select" label = "City" :options = "longList" name = "City2" placeholder = "Select City"/>
		<input-field type = "select" label = "City" :options = "[]" name = "City1" placeholder = "Select"/>
		<input v-model = "inputModelValue"/>
		{{inputModelValue}}
		{{values}}
	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form, useFormValues} from "../../../plugin";
import {reactive, ref} from "vue";
import {OptionRow} from "../../../plugin/types";
const form = new Form();
const values = useFormValues(form)

const inputModelValue = ref('')
const country = ref('');
const optionsCountry = {
	1: 'USA',
	2: 'Russia',
	3: 'China'
}
const optionsCity = {
	1: 'USA',
	2: 'Russia',
	3: 'China',
	4: 'Mogilev',
	5: 'Argentina',
	6: 'Columbia',
	7: 'Denmark',
	8:'France',
}

const value = ref("");
const isValue = ref(false);


const longList = reactive<OptionRow[]>([]);

for(let i = 0; i < 1000; i++) {
	longList.push({
		label: `Test - ${i}`,
		value: i,
	})
}

// @ts-ignore
window.form = form

</script>

<style>

.example-link {
	color: blue;
}
</style>
