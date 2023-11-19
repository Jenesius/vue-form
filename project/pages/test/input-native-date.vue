<template>
	<div>
		<p>{{modelValue}}</p>
		<button @click = "set"></button>
	</div>
</template>

<script setup lang = "ts">

const props = defineProps<{
	modelValue: any
}>()
const emits = defineEmits<{
	(event: 'update:modelValue', data: Date):void
}>()
function set() {
	emits('update:modelValue', new Date());
}

</script>

<style scoped>

</style>