<template>
	<field-wrap :label="label" :errors="errors">
		<textarea
			ref="refInput"
			class="input-textarea"
			:value="modelValue"
			@input="onInput($event.target.value)"
			:disabled="disabled"
			:class="{
					'input-textarea_error': errors.length !== 0
				}"
			:autofocus="autofocus"
			:placeholder="placeholder"
		></textarea>
	</field-wrap>
</template>

<script setup lang="ts">
import FieldWrap from "../field-wrap.vue";
import {nextTick, onMounted, ref, watch} from "vue";

const props = withDefaults(defineProps<{
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus: boolean,
	placeholder?: string,
	autoresize?: boolean | number | string
}>(), {})

const refInput = ref<HTMLElement>();
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

function onInput(v: string) {
	emit('update:modelValue', v);
}

/**
 * @description Resize function using for change height of Input.
 * 2 - size of border
 * 8 - size of padding
 * */
function resize() {
	if (!refInput.value) return;
	if (!props.modelValue) return;
	if (!props.autoresize) return;

	refInput.value.style.height = 0 + 'px';

	const scrollHeight = refInput.value.scrollHeight + 2;

	if (props.autoresize === true) {
		refInput.value.style.height = scrollHeight + "px";
	} else {
		const size = Number.parseInt(String(props.autoresize))
		refInput.value.style.height = (Math.min(scrollHeight, size * 20 + 8)) + "px";
	}

}

watch(() => props.modelValue, () => {
	nextTick(resize)
}, {
	immediate: true
})
onMounted(resize)

</script>

<style scoped>
.input-textarea {
	border-radius: var(--vf-input-border-radius);
	border: var(--vf-input-border);
	transition: border-color var(--vf-input-transtion-fast);
	outline: none;
	max-width: 100%;
	padding: 4px;
	box-sizing: border-box;
	min-height: 70px;
	font-size: var(--vf-input-font-size);
	background-color: var(--vf-input-background);
	color: var(--vf-input-color);
}

.input-textarea:focus {
	border-color: var(--vf-input-border-color-focus);
}

.input-textarea:disabled {
	background-color: var(--vf-input-background-disabled)
}

.input-textarea_error {
	border-color: var(--vf-input-error);
}
</style>