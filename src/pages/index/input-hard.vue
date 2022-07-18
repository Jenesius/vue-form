<template>
	<div>
		<p>User</p>
		<input-field name = "name" label = "name"/>
		<input-field type = "number" name = "age" label = "age" required/>
	</div>
</template>

<script setup lang = "ts">
	import InputField from "../../../plugin/widgets/input-field.vue";
	import {useProxyState} from "../../../plugin";

	const props = defineProps<{
		name: string
	}>()
	
	useProxyState(props.name);

</script>

<style scoped>

</style>