<template>
	<input-wrap :label = "label" :errors = "errors">
		<input class = "input-range" type = "range" :max="max" :min="min" :step = "step" :disabled = "disabled"
			   :value = "modelValue"
			   @input = "$emit('update:modelValue', $event.target.value)"
			   ref = "refInputRange"
			   :class = "{
				   'input-range_error': errors.length
			   }"
			   :autofocus="autofocus"
			   :style = "`background: linear-gradient(to right, ${ACTIVE_COLOR} 0%, ${ACTIVE_COLOR} ${progressCount}%, #fff ${progressCount}%, white 100%)`"
		/>
	</input-wrap>
</template>

<script setup lang = "ts">
import InputWrap from "../input-wrap.vue"
import {computed, ref} from "vue";

interface RangeProps {
	max?: number | string,
	min?: number | string,
	step?: number | string,
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus: boolean
	// thumb?: boolean
}
const props = withDefaults(defineProps<RangeProps>(), {
	min: 0,
	max: 100,
	step: 1
})
const refInputRange = ref<HTMLInputElement>();

const ACTIVE_COLOR = '#4e74ff'

const progressCount = computed(() => Number(props.modelValue) / (Number(props.max) - Number(props.min)) * 100); // 0 ... 100
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
		border: var(--vf-input-border);
		margin: 0;
		outline: none;
	}
	.input-range:disabled {
		appearance: none;
		background: var(--vf-input-background-disabled) !important;
	}
	.input-range:focus {
		border: var(--vf-input-border-focus);
	}
	/* Special styling for WebKit/Blink */
	.input-range::-webkit-slider-thumb {
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 10px;
		border: var(--vf-input-border);
		background-color: white;
		overflow: visible;
		cursor: pointer;
	}
	.input-range:disabled::-webkit-slider-thumb{
		background-color: var(--vf-input-background-disabled);
		cursor: default;
	}
	.input-range_error::-webkit-slider-thumb{
		border: var(--vf-input-border-error);
	}

</style>