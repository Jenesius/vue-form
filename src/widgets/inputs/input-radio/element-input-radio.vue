<template>
	<div
		class = "element-input-radio"
		:class = "{
        	'element-input-radio_active'	: modelValue,
        	'element-input-radio_disabled'	: disabled,
            'element-input-radio_error'	: error
        }"
		:tabindex = "tabindex"
		@click = "emit('input')"
		@keydown.down.prevent = "emit('next')"
		@keydown.up.prevent = "emit('prev')"
	>
		<div class = "element-input-radio-button">
			<transition name = "fade">
				<div class = "element-input-radio-button_active" v-if = "modelValue"></div>
			</transition>
		</div>

		<p class = "element-input-radio-label vf-input-label" v-if = "label">{{label}}</p>
	</div>
</template>

<script setup lang = "ts">
interface IProps {
	tabindex: string | number
	modelValue: boolean,
	disabled: boolean,
	error: boolean,
	label?: string
}

const props = defineProps<IProps>()
const emit = defineEmits<{
	(event: 'input'): void,
	(event: 'next'): void,
	(event: 'prev'): void
}>()
</script>

<style scoped>
	.element-input-radio {
		display: flex;
		gap: 10px;
		align-items: center;
		cursor: pointer;
		outline: none;
	}

	.element-input-radio-button {
		height: 20px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		border: var(--vf-input-border);
		background-color: var(--vf-input-background);
		display: grid;
		place-items: center;
	}
	.element-input-radio:focus .element-input-radio-button {
		border: var(--vf-input-border-focus);
	}
	.element-input-radio-button_active {
		height: 12px;
		aspect-ratio: 1/1;

		border-radius: 50%;
		background-color: var(--vf-input-active);
		border: 1px solid var(--vf-input-gray-dark)
	}
	.element-input-radio-label{
		margin: 0;
	}
	.element-input-radio_disabled{
		cursor: default;
	}
	.element-input-radio_disabled .element-input-radio-button{
		background-color: var(--vf-input-background-disabled);
	}
	.element-input-radio_disabled .element-input-radio-button_active{
		background-color: var(--vf-input-active-disabled);
	}
	.element-input-radio_error .element-input-radio-button{
		border: var(--vf-input-border-error);
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: 0.3s;
	}

	.fade-enter-from,
	.fade-leave-to {
		transform: scale(0);
	}
</style>