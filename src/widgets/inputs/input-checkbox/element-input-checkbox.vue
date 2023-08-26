<template>
	<div class = "element-input-checkbox" >
		<div
			class = "element-input-checkbox-button"
			:class = "{
                        'element-input-checkbox-button_active': modelValue,
                        'element-input-checkbox-button_disabled': disabled,
                        'element-input-checkbox-button_error': hasError,
                    }"
		>
			<i class = "element-input-checkbox-button__check"/>
		</div>
		<p class = "element-input-checkbox-label vf-input-label" v-if = "label">{{label}}</p>
	</div>
</template>

<script setup lang = "ts">

defineProps<{
	modelValue: boolean,
	label?: string,
	disabled: boolean,
	hasError: boolean
}>()
</script>

<style scoped>
.element-input-checkbox{
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 13px;
	outline: none;
}
.element-input-checkbox-button{
	width: 18px;
	height: 18px;
	margin: 0;
	border: var(--vf-input-border);
	background-color: var(--vf-input-background);
	border-radius: 3px;
	display: grid;
	place-content: center;
}
.element-input-checkbox-button_active{
	background-color: var(--vf-input-active);
}

.element-input-checkbox-button_disabled{
	background-color: var(--vf-input-background-disabled);
}
.element-input-checkbox-button_disabled.element-input-checkbox-button_active{
	background-color: var(--vf-input-active-disabled);
}
.element-input-checkbox:focus .element-input-checkbox-button {
	border: var(--vf-input-border-focus);
}
.element-input-checkbox-button_disabled{
	cursor: default;
}
.element-input-checkbox:has(.element-input-checkbox-button_disabled) {
	cursor: default;
}

.element-input-checkbox-button_error {
	border: var(--vf-input-border-error);
}
.element-input-checkbox-label{
	margin: 0;
}
.element-input-checkbox-button__check {
	display: none;
	width: 4px;
	height: 7px;
	border: solid white;
	border-width: 0 2px 2px 0;
	transform: rotate(45deg);
	margin: 1px 1px 4px 1px;
}
.element-input-checkbox-button_active>.element-input-checkbox-button__check{
	display: inline-block;
}
</style>