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

type ModifyFunction = (a: string) => string

const props = withDefaults(defineProps<{
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus: boolean,
	pretty?: (a: string) => string,
	modify?: ModifyFunction | ModifyFunction[]
	placeholder?: string,
	maxLength?: string | number,
	maxlength?: string | number,
	prefix?: string,
	name?: string
	numeric?: boolean
}>(), {
	pretty: (a: string) => a,
})

const refInput = ref<HTMLInputElement>(props.modelValue);
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

function onlyNumber(a: string) {
	return a.replace(/[^0-9,]/,'')
}

/**
 * @description Function for wrapping all modify callbacks.
 * */
function executeModify(v: string): string {
	const arrayModifyCallback: ModifyFunction[] = [];

	arrayModifyCallback.push(
		...(!props.modify ? [] : Array.isArray(props.modify) ? props.modify : [props.modify])
	);

	if (props.numeric) arrayModifyCallback.unshift(onlyNumber)

	try {
		arrayModifyCallback.forEach(modify => {
			v = modify(v)
		})
	} catch (e) {
		warn(`input-text${props.name ? ` (${props.name})` : ''}`, `Modify handler throw the error`, e)
	}

	return v;
}

function onInput(v: string) {
	if (
		("maxlength" in props && props.maxlength !== undefined) ||
		("maxLength" in props && props.maxlength !== undefined)) v = v.slice(0, Number(props.maxlength || props.maxLength))

	v = executeModify(v);

	refInput.value.value = v;
	emit('update:modelValue', v);
}

watch(() => props.maxLength, () => onInput(props.modelValue));

</script>

<style scoped>
.container-widget-input-text {
	display: flex;
	height: 35px;
	border-radius: 4px;
	border: 1px solid var(--input-gray-light);
	background-color: white;
}
.container-widget-input-text:focus-within {
	border-color: var(--input-gray-dark);
}
.container-widget-input-text_disabled {
	background-color: var(--input-disabled);
}
.container-widget-input-text_error {
	border: 1px solid var(--input-error);
}
.widget-input-text-prefix {
	color: #646363;
	line-height: 35px;
	font-size: 14px;
	padding: 0 0 0 4px;
}
.widget-input-text {
	flex-grow: 1;
	outline: none;
	background-color: transparent;
	border:0;
	padding: 0 4px;
}
</style>
