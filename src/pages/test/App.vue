<template>
	<div class="container-examples">


		<input-field type = "text" name = "sun" label = "Username" prefix = "MMM"  :modify = "splitPoint"/>

		<input-field type = "coord" name = "coordinate"/>

		<input-coord name="coordinate" />

		<input-field name = "file" type = "file"/>

	</div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {config, Form, useInputState} from "../../../plugin";
import {onMounted, ref} from "vue";
import WidgetChild from "@/pages/test/widget-child.vue";
import InputCoord from "@/pages/test/input-coord.vue";

const form = new Form();




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
