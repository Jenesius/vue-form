<template>
	<input-wrap :label="label" :errors="errors">
    <textarea
		ref="refInput"
		class="widget-input-textarea"
		:value="modelValue"
		@input="onInput($event.target.value)"
		:disabled="disabled"
		:class="{
				'input-textarea_error': errors.length !== 0
            }"
		:autofocus="autofocus"
		:placeholder="placeholder"
	></textarea>
	</input-wrap>
</template>

<script setup lang="ts">
import InputWrap from "../input-wrap.vue";
import {onMounted, ref, watch} from "vue";

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
	resize()
}, {
	immediate: true
})
onMounted(() => {
	resize()
})

</script>

<style scoped>
.widget-input-textarea {
	border-radius: var(--vf-input-border-radius);
	border: 1px solid var(--vf-input-border-color);
	transition: border-color 0.1s;
	outline: none;
	max-width: 100%;
	padding: 4px;
	box-sizing: border-box;
	min-height: 70px;
	line-height: 20px;
	font-size: var(--vf-input-font-size);
	background-color: white;
	color: var(--vf-input-color);
}

.widget-input-textarea:focus {
	border-color: var(--vf-input-border-color-focus);
}

.widget-input-textarea:disabled {
	background-color: var(--vf-input-background-disabled)
}

.input-textarea_error {
	border-color: var(--vf-input-error);
}
</style>