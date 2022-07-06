<template>
	<div>
		<p>Table</p>
		<div>
			<p v-for = "item in array"
				:key = "item.index"
			>{{item.name}}</p>
		</div>
		<input type = "text"/>
		<button @click = "addNew">Add</button>
	</div>
</template>

<script setup lang = "ts">

	import Table from "@/pages/v2/table";
	import {Form} from "../../../plugin";
	import {ref} from "vue";
	
	const table = new Table();

	Form.getParentForm()?.subscribe(table);
	
	
	function addNew() {
		const index = Math.ceil(Math.random() * 100);
		
		table.add({
			index,
			name: 'T-' + index
		})
	}
	
	const array = ref<any[]>([]);
	table.on(Form.EVENT_VALUE, () => array.value = table.values.map(elem => elem));
	
	
</script>

<style scoped>

</style>