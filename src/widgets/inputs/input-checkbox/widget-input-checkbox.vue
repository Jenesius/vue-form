<template>
	<field-wrap :label="label" :errors = "errors">
		<div class="container-input-checkbox">
			<element-input-checkbox
				v-for="item in options"
				:key="item.value"
				:model-value="isActive(item.value)"
				:disabled="disabled"
				:label="item.label || item.title"
				:tabindex="disabled? 'none' : 0"
				:has-error = "errors.length !== 0"

				@click="handleInput(item.value)"
				@keyup.enter="handleInput(item.value)"
				@keydown.space.prevent
				@keyup.space.prevent="handleInput(item.value)"
			/>
		</div>
	</field-wrap>
</template>

<script setup lang="ts">
import FieldWrap from "../field-wrap.vue";
import {OptionRow} from "../../../types";
import ElementInputCheckbox from "./element-input-checkbox.vue";

const props = defineProps<{
	label?: string,
	options: OptionRow[],
	modelValue: any,
	disabled: boolean,
	errors: string[],
}>()
const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

function isActive(v: unknown) {
	return props.modelValue?.includes?.(v) || false;
}

/**
 * @description Функция либо добавляет значение в input, если его ещё нет в modelValue, либо убирает его, если оно так
 * уже есть
 * */
function modifyValue(v: unknown) {
	const arr: any[] = Array.isArray(props.modelValue) ? props.modelValue : [];

	const index = arr.indexOf(v);
	if (index === -1) arr.push(v);
	else arr.splice(index, 1);

	return arr;
}

function handleInput(v: unknown) {
	if (props.disabled) return;
	emit('update:modelValue', modifyValue(v))
}

</script>

<style scoped>
.container-input-checkbox {
	display: flex;
	flex-direction: column;
	gap: 14px;
}
</style>
