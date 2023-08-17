<template>
	<component
		:is="componentItem"
		:name="name"
		:key = name

		:modelValue="input ? input.value : $attrs['modelValue']"
		@update:modelValue = "handleInput"

        :disabled = "input?.disabled || $attrs['disabled'] || false"
        :changed  = "input?.changed"
        :errors="input?.errors || []"
		:options="parseOptions(options)"
	/>
</template>

<script setup lang="ts">
import {computed, watch} from "vue";
import {getFieldType} from "../config/store";
import Form from "../classes/Form";
import {FormInput, FormInputValidationCallback} from "../types";
import useFormInput from "../hooks/use-form-input";
import mergeValidation from "../local-hooks/merge-input-validation";
import {OptionRow} from "../types";
import {parseOptions} from "../local-hooks/parse-options";

interface IProps {
	name?: string,
	type?: string,
    validation?: FormInputValidationCallback[] | FormInputValidationCallback,
    required?: boolean,
	options?: OptionRow[] | Record<string, any>
}
const props = defineProps<IProps>()
const emit = defineEmits<{
	(event: 'update:modelValue', value: any): void
}>()
const componentItem = computed(() => getFieldType(props.type));
const parentForm = Form.getParentForm();

function handleInput(value: any) {
	if (input) input.setValue?.(value);
	emit('update:modelValue', value)
}

let input: FormInput | null = null;
watch(() => props.name, initializeInput, {immediate: true});

function initializeInput() {
	if (!parentForm) return;
	if (!props.name) return;
	input = useFormInput(parentForm, props.name);
	input.setValidation(mergeValidation(props))
}

</script>
<style>
@import "./../styles/main.css";
</style>
