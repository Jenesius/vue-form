<template>
	<field-wrap :label="label" :errors="errors">

		<div class="container-input-radio" ref = "refContainerInputRadio">
			<element-input-radio
				v-for="(item, index) in options"
				:key="item.value"

				:model-value="modelValue === item.value"
				:tabindex = "getTabindex(index)"
				:disabled="disabled"
				:label="item.label || item.title"
				:error="!!errors.length"

				@input="onInput(item.value)"
				@next = "handleMove(1)"
				@prev = "handleMove(-1)"


			/>

		</div>

	</field-wrap>
</template>

<script setup lang="ts">
import FieldWrap from "../field-wrap.vue";
import {OptionRow} from "../../../types";
import ElementInputRadio from "./element-input-radio.vue";
import {nextTick, ref} from "vue";
import updateInputPosition from "../../../utils/update-input-position";

const props = defineProps<{
	label?: string,
	options: OptionRow[],
	modelValue: any,
	disabled: boolean,
	errors: string[],
}>()

const refContainerInputRadio = ref<HTMLElement>()
const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()
function onInput(v: void) {
	if (props.disabled) return;
	emit('update:modelValue', v)
}

function getTabindex(index: number) {
	const item = props.options[index];
	if (props.disabled) return 'none';
	// Если есть modelValue, то tabindex на элемент у которого совпадает значение
	// Если нет, то tabindex - на первый
	return (props.modelValue ? props.modelValue === item.value : index === 0) ? 0 : 'none';
}

function handleMove(duration: number) {

	updateInputPosition({options: props.options, value: props.modelValue || props.options[0].value, onInput, duration});
	focusActiveItem()
}

function focusActiveItem() {
	const container = refContainerInputRadio.value;
	if (!container) return;

	nextTick(() => {
		container.querySelector<HTMLElement>(".element-input-radio_active")?.focus()
	})
}

</script>

<style scoped>
.container-input-radio {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.container-input-radio:focus {
	outline: none;
}
</style>
