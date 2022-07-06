<template>
	<div>
		<p>User</p>
		<input-field name = "name" label = "name"/>
		<input-field name = "age" label = "age"/>
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