<template>
	<div>
		<input-field name = "X" label = "X"/>
		<input-field name = "Y" label = "Y"/>
		<button @click = "random">test</button>
		{{values}}
	</div>
</template>

<script setup lang = "ts">
import {Form, InputField, useFormValues} from "../../../plugin";

const props = defineProps<{
	name: string,
}>()

const form = new Form({
	name: props.name
})

function random() {
	form.change({
		X: Math.random()
	})
}

const values = useFormValues(form)
</script>

<style scoped>

</style>