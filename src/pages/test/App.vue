<template>
	<div class="container-examples">

		<input-field type = "text" name = "sun" required label = "Username" disabled/>

		<input-field type = "text" name = "sun" required label = "Username"/>

		<input-field type = "text" name = "sun" label = "Username"/>

		<input-field type = "text" name = "sun" label = "Username" prefix = "MMM"  :pretty = "splitPoint"/>
		<input-field type = "text" name = "sun" label = "numeric" prefix = "MMM" :modify = "[]" numeric />

		<widget-child/>
	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form, useInputState} from "../../../plugin";
import {onMounted, ref} from "vue";
import WidgetChild from "@/pages/test/widget-child.vue";

const form = new Form();


onMounted(() => setTimeout(() => form.validate(), 1000))


function m1(a: string) {
	return a.replace(/\D/,'')
}


function test() {
	throw new Error('test')
}

function splitPoint(a: string) {
	return (a || '').replaceAll('.', '').split('').join('.');
}
window.form = form

</script>

<style>

</style>
