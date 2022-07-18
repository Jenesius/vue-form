<template>
	<input-wrap :label = "label">
		<div class = "input-number"
			:class = "{
				'input-number_disabled': disabled,
				'input-number_error': errors.length !== 0
			}"
		>
			
			<widget-number-step
				@step = "onStep"
			/>
			<input
				class = "widget-input-text"
				type = "text"
				:value = "modelValue"
				@input = "onInput($event.target.value)"
				:disabled = "disabled"
				:class = "{
				
            }"
			>
		</div>
	</input-wrap>
</template>

<script setup lang = "ts">
import InputWrap from "../input-wrap.vue";
import WidgetNumberStep from "./widget-number-step.vue";
import {withDefaults} from "vue";

interface Props{
	label?: string,
	modelValue: any,
	disabled?: boolean,
	errors: string[],
	step?: number
}
const props = withDefaults(defineProps<Props>(), {
	step: 1
})

const emits = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

function onInput(v: number) {
	emits("update:modelValue", Number(v));
}

function onStep(v: boolean) {
	onInput(Number(props.modelValue || 0) + (Number(props.step) * (v?1:-1)))
}


</script>

<style scoped>
	.widget-input-text{
		border: 0;
		outline: none;
		padding: 0 4px;
		color: #1c1c1c;
		text-align: right;
		background-color: transparent;
	}
	.widget-input-text:focus{
		border-color: #b2b2b2;
	}
	.input-number{
		display: grid;
		grid-template-columns: 30px 1fr;
		border: 1px solid #c8c8c8;
		height: 35px;
		border-radius: 4px;
		background-color: white;
	}

	.input-number_disabled{
		background-color: #e9e9e9;
		position: relative;
	}
	.input-number_error{
		border: 1px solid #fa5c5c;
	}

	.input-number:focus-within {
		border-color: #b2b2b2;
	}
	.input-number_disabled>div:nth-child(1) {
		background-color: #e0e0e0;
		cursor: default;
	}
	.input-number_disabled>div:nth-child(1):after{
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}
</style>
