<template>
	<div class = "widget-select-search" >
		<input type="text" class = "widget-select-search__input" placeholder="Search..." @input = "emits('update:modelValue', $event.target.value)"
			:value = "modelValue"
			@focusin = "emits('focusin')"
			@focusout = "emits('focusout')"
		/>
	</div>
</template>

<script setup lang = "ts">

defineProps<{
	modelValue: string
}>()
const emits=  defineEmits<{
	(event: 'update:modelValue', value?: string): void,
	(event: 'focusin'): void,
	(event: 'focusout'): void
}>()


</script>

<style scoped>
	.widget-select-search__input {
		padding: 8px 8px;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #d1d1d1;
		outline: none;
		border-radius: 4px;
		color: #1c1c1c;
	}
	.widget-select-search__input:focus {
		border-color: #b2b2b2;
	}
	.widget-select-search {
		padding: 6px;
		background-color: #f4f4f4;
	}
</style>