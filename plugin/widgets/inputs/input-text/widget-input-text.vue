<template>
	<input-wrap :label="label" :errors="errors">
		<div
			class = "container-widget-input-text"
			:class="{
					'container-widget-input-text_error': errors.length !== 0,
					'container-widget-input-text_disabled': disabled
			}"
		>
			<span class = "widget-input-text-prefix" v-if = "prefix">{{prefix}}</span>
			<input
				ref="refInput"
				class="widget-input-text"
				type="text"
				:value="pretty(modelValue)"
				:disabled="disabled"
				:autofocus="autofocus"
				:placeholder="placeholder"
				@input="onInput($event.target.value)"
			>
		</div>
	</input-wrap>
</template>

<script setup lang="ts">
import InputWrap from "../input-wrap.vue";
import {ref, watch} from "vue";
import warn from "../../../debug/warn";

const props = withDefaults(defineProps<{
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus: boolean,
	pretty?: (a: string) => string,
	modify?: (a: any) => string,
	placeholder?: string,
	maxLength?: string | number,
	maxlength?: string | number,
	prefix?: string,
	name?: string
}>(), {
	pretty: (a: string) => a,
	modify: (a: any) => a
})

const refInput = ref<HTMLInputElement>(props.modelValue);
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

function onInput(v: string) {
	if (
		("maxlength" in props && props.maxlength !== undefined) ||
		("maxLength" in props && props.maxlength !== undefined)) v = v.slice(0, Number(props.maxlength || props.maxLength))

	try {
		v = props.modify(v);
	} catch (e) {
		warn(`input-text${props.name ? ` (${props.name})` : ''}`, `Modify handler throw the error`, e)
	}


	refInput.value.value = v;
	emit('update:modelValue', v);
}

watch(() => props.maxLength, () => onInput(props.modelValue));

</script>

<style scoped>
.container-widget-input-text {
	display: flex;
	height: 35px;
	border-radius: var(--vf-input-border-radius);
	border: 1px solid var(--vf-input-border-color);
	background-color: white;
}
.container-widget-input-text:focus-within {
	border-color: var(--vf-input-gray-dark);
}
.container-widget-input-text_disabled {
	background-color: var(--vf-input-background-disabled);
}
.container-widget-input-text_error {
	border: 1px solid var(--vf-input-error);
}
.widget-input-text-prefix {
	color: #646363;
	line-height: 35px;
	font-size: var(--vf-input-font-size);
	padding: 0 0 0 4px;
}
.widget-input-text {
	flex-grow: 1;
	outline: none;
	background-color: transparent;
	border:0;
	padding: 0 4px;
	color: var(--vf-input-color);
	font-size: var(--vf-input-font-size);
}
</style>
