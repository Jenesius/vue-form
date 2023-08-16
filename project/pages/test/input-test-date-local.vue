<template>
	<div>
		<input-date
			v-bind = "$attrs"
			:model-value = "modelValue"
			@update:modelValue = "onUpdate"
		/>
	</div>
</template>

<script setup lang = "ts">
import InputDate from "../../../src/widgets/input-date/input-date.vue";

const props = defineProps<{
	modelValue: any
}>()
const emit = defineEmits<{
	(event: 'update:modelValue', v: string): void
}>()
// UTC FORMAT -> LOCAL FORMAT
function onUpdate(v: string) {
	const date = new Date(v);
	emit('update:modelValue', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

</script>

<style scoped>

</style>