<template>
	<field-wrap :label = "label">
		<div class = "container-input-number"
			:class = "{
				'container-input-number_disabled': disabled,
				'container-input-number_error': errors.length !== 0
			}"
		>
			<widget-number-step
				@step = "onStep"
				:disabled = "disabled"
			/>
			<input
				ref = "refInput"
				class = "input-number"
				type = "text"
				:value = "isFocused ? modelValue : executePretty(modelValue)"
				@input = "onInput($event.target.value)"
				:disabled = "disabled"
				:autofocus="autofocus"

				@keyup.up = "onStep(true)"
				@keyup.down.prevent = "onStep(false)"
                @focusin = "isFocused = true"
                @focusout = "isFocused = false"
			>
			<span v-if = "suffix" class = "input-number-suffix">{{suffix}}</span>
		</div>
	</field-wrap>
</template>

<script setup lang = "ts">
import WidgetNumberStep from "./widget-number-step.vue";
import {ref, withDefaults} from "vue";
import {StringModify} from "../../../types";
import useModify from "../../../local-hooks/use-modify";
import FieldWrap from "../field-wrap.vue";
interface Props{
	step?: number,
	label?: string,
	errors: string[],
	modelValue?: number,
	disabled: boolean,
	autofocus: boolean,
	name: string,
	pretty?: StringModify | StringModify[],
	suffix?: string,
	decimal?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	step: 1
})
const isFocused = ref(false);

const executePretty = useModify(() => props.pretty);


const emits = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()
const refInput = ref<HTMLInputElement>()
function onInput(v: string | number) {

	if (typeof v === "number") {
		emits('update:modelValue', v);
	}
	else {
		v = v.replace(/[^0-9.]/g, '');
		emits("update:modelValue", Number.parseFloat(v));
	}

	if (refInput.value)
		refInput.value.value = String(v);
}

function onStep(v: boolean) {
	if (typeof props.modelValue !== "number") return void onInput(0);

	onInput(props.modelValue + (Number(props.step) * (v?1:-1)))
}

</script>

<style scoped>

	.container-input-number{
		display: flex;
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
		display: flex;
		flex-grow: 1;
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
		z-index: 0;
	}
	.input-number-suffix {
        color: var(--vf-input-black-light);
        line-height: var(--vf-input-height);
        font-size: var(--vf-input-font-size);
        padding: 0 5px 0 0;
	}
</style>
