<template>
	<input-wrap>
		<div class="container-input-switch">
			<div class="input-switch"
				 @click="onInput()"
				 :class="{
                     'input-switch_disabled': disabled
                 }"
				 :tabindex=" disabled ? 'none' : 0"
				 @keyup.enter = "onInput()"
			>
				<div class="input-switch-button"
					 :class="{
                    'input-switch-button_active': !!modelValue
                }"
				></div>
			</div>
			<p class="input-switch-label vf-input-label">{{ label }}</p>
		</div>

	</input-wrap>
</template>

<script setup lang="ts">
import InputWrap from "../input-wrap.vue";

const props = defineProps<{
	label?: string,
	modelValue: any,
	disabled: boolean
}>()


const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

function onInput(v = !props.modelValue) {
	if (props.disabled) return;
	emit('update:modelValue', v)
}

</script>

<style scoped>
.container-input-switch {
	display: flex;
	gap: 12px;
	align-items: center;
}

.input-switch {
	width: 38px;
	border-radius: 11px;
	border: var(--vf-input-border);
	height: 21px;
	box-sizing: border-box;
	cursor: pointer;
	display: flex;
	outline: none;
	align-items: center;
	background-color: var(--vf-input-background);
}

.input-switch:focus {
	border: var(--vf-input-border-focus);
}
.input-switch-button {
	height: 15px;
	aspect-ratio: 1/1;
	background-color: var(--vf-input-gray-light);
	border-radius: 50%;
	transform: translateX(3px);
	transition: transform var(--vf-input-transtion-fast), color var(--vf-input-transtion-fast);
}

.input-switch-button_active {
	background-color: var(--vf-input-active);
	transform: translateX(18px);
}

.input-switch-label {
	margin: 0;
}

.input-switch_disabled {
	background-color: var(--vf-input-background-disabled);
	cursor: default;
}

.input-switch_disabled .input-switch-button_active {
	background-color: var(--vf-input-active-disabled)
}
</style>
