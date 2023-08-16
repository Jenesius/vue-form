<template>
	<div>
		{{modelValue}}
		<input-date
			v-bind = "$attrs"
			:model-value = "parsedModelValue"
			@update:modelValue = "onUpdate"
			mask="DD*MM*YYYY"
		/>
	</div>
</template>

<script setup lang = "ts">
import InputDate from "../../../src/widgets/inputs/input-date/input-date.vue";
import {computed} from "vue";

const props = defineProps<{
	modelValue: any
}>()
const emit = defineEmits<{
	(event: 'update:modelValue', v: string): void
}>()

const parsedModelValue = computed(() => {
	const date = new Date(props.modelValue);
	if (!date.getTime()) return ""
	return date.toISOString()
})

// UTC FORMAT -> LOCAL FORMAT
function onUpdate(v: string) {
	console.log('TO', v);
	const date = new Date(v);
	console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
	emit('update:modelValue', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

</script>

<style scoped>

</style>