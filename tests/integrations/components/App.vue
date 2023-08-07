<template>
	<div>
		<form-field name="username" />
		<form-field name="age" v-if = "visible" />

		<widget-composite/>
	</div>
</template>

<script setup lang = "ts">
import FormField from "../../../src/widgets/form-field.vue";
import Form from "../../../src/classes/Form";
import {ref} from "vue";
import WidgetComposite from "./widget-composite.vue";
const form = new Form({
	name: "main"
})

const visible = ref(false);

function showFieldAge() {
	visible.value = !visible.value;
}

</script>

<style scoped>

</style>