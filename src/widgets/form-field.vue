<template>
	<component
		:is="componentItem"
		:name="name"
		:key = name

		:modelValue="value"


		@update:modelValue = "handleInput"
	/>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {getFieldType} from "./../config/store";
import Form from "../classes/Form";

interface IProps {
	name: string,
	type?: string
}
const props = defineProps<IProps>()
const parentForm = Form.getParentForm();
const componentItem = computed(() => getFieldType(props.type));

const value = getComputedFieldValue(props)
function handleInput(value: any) {
	parentForm?.setValues({
		[props.name]: value
	});
}

function getComputedFieldValue<T extends {name: any}>(props: T) {
	const form = Form.getParentForm();

	if (!form) console.warn('Form is not provided')

	function getValue() {
		return form?.getValueByName(props.name);
	}
	function updateValue() {
		console.log(`Set value for input(%c${props.name}%c)`, 'color: blue', 'color: black');
		setTimeout(() => {
			value.value = getValue()
		}, 0)
	}

	const value = ref(getValue());

	let off: any;

	watch(() => props.name, (newName) => {
		if (off) off();

		off = form?.oninput(newName, updateValue);
		updateValue();
	}, {
		immediate: true,
	});

	return value;
}

</script>
<style>

</style>
