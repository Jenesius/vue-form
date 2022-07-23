<template>
	<div>
		<input type = "file" @change = "onInput($event.target.files[0])"/>
		{{modelValue}}
	</div>

</template>

<script setup lang = "ts">
defineProps<{
	modelValue: any
}>()
const emits = defineEmits<{
	(name: 'update:modelValue', f: any): void
}>()

function onInput(f: File) {

	emits('update:modelValue', Object.freeze(f))
}

</script>

<style scoped>

</style>