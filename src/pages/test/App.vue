<template>
	<div class="container-examples">
		<widget-mother/>
		<widget-daughter label="1"/>
		<!--
		<br/>
		<br/>
		<br/>


		<input-field type = "account-type" name = "new-acc-type" label = "New Account Type"/>
		<widget-input-account-type name = "test"/>

-->

		{{values}}
	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form, useFormValues} from "../../../plugin";
import {reactive, ref} from "vue";
import WidgetInputAccountType from "@/pages/test/widget-input-account-type.vue";
import WidgetField from "./widget-field.vue";
import WidgetParent from "@/pages/test/widget-parent.vue";
import WidgetGrandmother from "@/pages/test/widget-grandmother.vue";
import WidgetMother from "@/pages/test/widget-mother.vue";
import WidgetDaughter from "@/pages/test/widget-daughter.vue";



const form = new Form();
const values = useFormValues(form)

const country = ref('');

window.form = form

</script>

<style>

.example-link {
	color: blue;
}
</style>
