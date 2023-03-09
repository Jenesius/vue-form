<template>
	<div class="container-examples">

		<div class = "test">
			<element-input-radio :model-value="true" :disabled="false" label="Check?" :error="true"/>
			<element-input-radio :model-value="true" :disabled="true" label="Check?" :error="true"/>
			<element-input-radio :model-value="true" :disabled="true" label="Check?" :error="false"/>
			<element-input-radio :model-value="false" :disabled="true" label="Check?" :error="false"/>
			<element-input-radio :model-value="false" :disabled="false" label="Check?" :error="true"/>
			<element-input-radio :model-value="false" :disabled="false" label="Check?" :error="false"/>
		</div>

		<div>
			<input-field type = "single-radio" name = "test" :errors = "['test']"/>
		</div>

		{{values}}
	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form, useFormValues} from "../../../plugin";
import ElementInputRadio from "../../../plugin/widgets/inputs/input-radio/element-input-radio.vue";

const form = new Form();
const values = useFormValues(form)

const options = [
	{ label: "London", value: "L"},
	{ label: "Moscow", value: "M"},
	{ label: "Minsk" , value: "Minsk" }
]

</script>

<style>

.example-link {
	color: blue;
}
	.test {
		display: grid;
		gap: 15px;
	}
</style>
