<template>
	<field-wrap :label="label" :errors="errors">
		<div class="container-input-password"
			 :class="{
			'container-input-password_disabled': disabled,
			'container-input-password_error': errors.length
		}"
		>
			<input
				class="input-password"
				:type="typeInput"
				:value="modelValue"
				@input="emit('update:modelValue', $event.target.value)"
				:disabled="disabled"
				:autofocus="autofocus || false"
			/>
			<div class="input-password-toggle" @click="toggleType()">
				<icon-eye :crossed = "typeInput === 'text'"/>
			</div>

		</div>
	</field-wrap>
</template>

<script setup lang="ts">
import FieldWrap from "../field-wrap.vue";
import {ref} from "vue";
import IconEye from "../../icons/icon-eye.vue";

interface Props {
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus?: boolean | string
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

function onInput(v: any) {
	if (props.disabled) return;
	emit('update:modelValue', v)
}


const typeInput = ref<"password" | "text">("password");

/**
 * @description Change type of InputElement. text -> password. password -> text
 * */
function toggleType() {
	typeInput.value = typeInput.value === "text" ? "password" : "text";
}

</script>

<style scoped>
.container-input-password {
	display: flex;
	align-items: center;

	height: var(--vf-input-height);
	border-radius: var(--vf-input-border-radius);
	border: var(--vf-input-border);
	background-color: var(--vf-input-background);
}

.container-input-password:focus-within {
	border-color: var(--vf-input-border-color-focus);
}

.container-input-password_disabled {
	background-color: var(--vf-input-background-disabled)
}

.input-password {
	outline: none;
	border: 0;
	background-color: transparent;
	height: 100%;
	flex-grow: 1;
	width: 100%;
	padding: 0 4px;
	font-size: var(--vf-input-font-size);
}

.input-password-toggle {
	padding: 0 10px;
	height: 100%;
	display: grid;
	place-content: center;
	cursor: pointer;
	stroke: var(--vf-input-gray-deep);
}

.container-input-password_error {
	border: var(--vf-input-border-error);
}
</style>
