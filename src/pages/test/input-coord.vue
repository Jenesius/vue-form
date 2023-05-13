<template>
	<div>
		<input-field name = "X" label = "X"/>
		<input-field name = "Y" label = "Y"/>

		{{values}}
	</div>
</template>

<script setup lang = "ts">
import {InputField, useFormValues, useProxyState} from "../../../plugin";

const props = defineProps<{
	name: string,
}>()
const {form} = useProxyState(props.name)

const values = useFormValues(form)
</script>

<style scoped>

</style>