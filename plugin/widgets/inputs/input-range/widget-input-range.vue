<template>
	<input-wrap :label = "label">
		<input class = "input-range" type = "range" :max="max" :min="min" :step = "step" :disabled = "disabled"
			   :value = "modelValue"
			   @input = "$emit('update:modelValue', $event.target.value)"
			   ref = "refInputRange"
			   :class = "{
				   'input-range_error': errors.length
			   }"
			   :style = "`background: linear-gradient(to right, ${ACTIVE_COLOR} 0%, ${ACTIVE_COLOR} ${progressCount}%, #fff ${progressCount}%, white 100%)`"
		/>
		<!--
		<div class = "container-range-thumb">
			<span class = "range-thumb" v-if = "thumb"
				:style = "`transform: translateX(calc(${progressCount}% - calc(20px * ${(progressCount + (2 * (100 -progressCount)/100) )/100})))`"
			>{{modelValue}}</span>
		</div>
		-->
	</input-wrap>
</template>

<script setup lang = "ts">
import InputWrap from "../input-wrap.vue"
import {computed, onMounted, ref, watch} from "vue";

interface Props {
	label: string,
	modelValue: any,
	disabled?: boolean,
	errors: string[],
	max: number | string,
	min: number | string,
	step: number | string,
	// thumb?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	min: 0,
	max: 100,
	step: 1
})
const refInputRange = ref<HTMLInputElement>();

const ACTIVE_COLOR = '#4e74ff'

const progressCount = computed(() => props.modelValue / (Number(props.max) - Number(props.min)) * 100); // 0 ... 100


/**
 * If someone uses this shit, I will write custom input-range with Blackjack and hookers.
 * 19.07.2022 @Jenesius
 *
 * Thumb was removed, because organization thumb container using transform is ugly. In the future, we can use custom
 * thumb and int this case realize thumb-value will be easy.
 * */

</script>

<style scoped>
	.input-range {
		width: calc(100% - 2px);
		height: 8px;
		border-radius: 4px;
		appearance: none;
		border: 1px solid #c8c8c8;
		margin: 0;
		outline: none;
	}
	.input-range:disabled {
		appearance: none;
		background: #e9e9e9 !important;
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
	.input-range:disabled::-webkit-slider-thumb{
		background-color: #e0e0e0;
		cursor: default;
	}
	.input-range_error::-webkit-slider-thumb{
		border-color: red;
	}

</style>