<template>
	<input-wrap :label = "label">
		<div class = "container-input-number"
			:class = "{
				'container-input-number_disabled': disabled,
				'container-input-number_error': errors.length !== 0
			}"
		>
			
			<widget-number-step
				@step = "onStep"
			/>
			<input
				ref = "refInput"
				class = "input-number"
				type = "text"
				:value = "modelValue"
				@input = "onInput($event.target.value)"
				:disabled = "disabled"
				:autofocus="autofocus"

				@keyup.up = "onStep(true)"
				@keyup.down.prevent = "onStep(false)"
			>
		</div>
	</input-wrap>
</template>

<script setup lang = "ts">
import InputWrap from "../input-wrap.vue";
import WidgetNumberStep from "./widget-number-step.vue";
import {ref, withDefaults} from "vue";

interface Props{
	step?: number,
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus: boolean
}
const props = withDefaults(defineProps<Props>(), {
	step: 1
})

const emits = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()
const refInput = ref<HTMLInputElement>()
function onInput(v: string | number) {

	if (typeof v === "string") {
		v = v.replace(/\D/g, '');
	}
	emits("update:modelValue", Number(v));
	if (refInput.value)
		refInput.value.value = String(v);
}

function onStep(v: boolean) {
	onInput(Number(props.modelValue || 0) + (Number(props.step) * (v?1:-1)))
}

</script>

<style scoped>

	.container-input-number{
		display: grid;
		grid-template-columns: 30px 1fr;
		border: 1px solid var(--vf-input-border-color);
		height: var(--vf-input-height);
		border-radius: var(--vf-input-border-radius);
		background-color: var(--vf-input-background);
	}
	.container-input-number_disabled{
		background-color: var(--vf-input-background-disabled);
		position: relative;
	}
	.container-input-number_error{
		border: var(--vf-input-border-error);
	}

	.container-input-number:focus-within {
		border: var(--vf-input-border-focus);
	}
	.input-number{
		border: 0;
		outline: none;
		padding: 0 4px;
		color: var(--vf-input-color);
		text-align: right;
		background-color: transparent;
	}
	.container-input-number_disabled>div:nth-child(1) {
		background-color: var(--vf-input-white-dark);
		cursor: default;
	}
	.container-input-number_disabled>div:nth-child(1):after{
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}
</style>
