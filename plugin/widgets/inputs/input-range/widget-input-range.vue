<template>
	<input-wrap :label = "label">
		<input class = "input-range" type = "range" :max="max" :min="min" :step = "step" :disabled = "disabled"
			   :value = "modelValue"
			   @input = "$emit('update:modelValue', $event.target.value)"
			   ref = "refInputRange"
		/>
	</input-wrap>
</template>

<script setup lang = "ts">
import InputWrap from "../input-wrap.vue"
import {onMounted, ref, watch} from "vue";

interface Props {
	label: string,
	modelValue: any,
	disabled?: boolean,
	errors: string[],
	max: number | string,
	min: number | string,
	step: number | string
}
const props = defineProps<Props>()
const refInputRange = ref<HTMLInputElement>();

const ACTIVE_COLOR = '#4e74ff'

// .chrome styling
onMounted(() => {
	updateRangeFillLowerStyles()
})


function updateRangeFillLowerStyles() {
	if (!refInputRange.value) return;

	const value = props.modelValue / (Number(props.max) - Number(props.min)) * 100;
	refInputRange.value.style.background = `linear-gradient(to right, ${ACTIVE_COLOR} 0%, ${ACTIVE_COLOR} ${value}%, #fff ${value}%, white 100%)`
}

watch(() => props.modelValue, updateRangeFillLowerStyles, {immediate: true})




</script>

<style scoped>
	.input-range {
		width: calc(100% - 2px);
		height: 8px;
		border-radius: 4px;
		appearance: none;
		border: 1px solid #c8c8c8;
		margin: 0;
	}
	.input-range:disabled {
		appearance: none;
		background-color: #e9e9e9;
		border: 1px solid #c8c8c8;
	}
	
	/* Special styling for WebKit/Blink */
	.input-range::-webkit-slider-thumb {
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 10px;
		border: 1px solid #c8c8c8;
		background-color: white;
		overflow: visible;
		cursor: pointer;
	}

</style>