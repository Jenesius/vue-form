<template>
	<div class="container-input-select-search">
		<input type="text" class="container-input-select-search-input" placeholder="Search..."
			   @input="emits('update:modelValue', $event.target.value)"
			   :value="modelValue"
			   @focusin="emits('focusin')"
			   @focusout="emits('focusout')"
		/>
	</div>
</template>

<script setup lang="ts">

defineProps<{
	modelValue: string
}>()
const emits = defineEmits<{
	(event: 'update:modelValue', value?: string): void,
	(event: 'focusin'): void,
	(event: 'focusout'): void
}>()


</script>

<style scoped>
.container-input-select-search {
	padding: 6px;
	background-color: var(--vf-input-white-light);
}

.container-input-select-search-input {
	padding: 8px 8px;
	width: 100%;
	box-sizing: border-box;
	border: var(--vf-input-border);
	outline: none;
	border-radius: var(--vf-input-border-radius);
	color: var(--vf-input-color);
	background-color: var(--vf-input-background);
}

.container-input-select-search-input:focus {
	border: var(--vf-input-border-focus);
}

</style>