<template>
    <field-wrap  :errors = "errors">
        <div class = "container-input-tel" @click = "inputTel?.focus?.()"
			 :class = "{
                    'container-input-tel_disabled': disabled,
                    'container-input-tel_error': errors.length
                }">
            <widget-input-tel-code :country-code="countryCode"/>
            <input type = "text" class = "vf-input_clean input-tel" ref = "inputTel"
                   @input = "onInput"
                   :value = "prettyValue"
                   :disabled = "disabled"
				   :autofocus="autofocus"
            >
        </div>
    </field-wrap>
</template>

<script setup lang = "ts">
import FieldWrap from "../field-wrap.vue";
import WidgetInputTelCode from "./widget-input-tel-code.vue";
import {computed, ref} from "vue";
import {AsYouType, parsePhoneNumber} from 'libphonenumber-js'

interface Props {
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

// Ref to Input
const inputTel = ref<HTMLInputElement>();
/**
 * @description Using libphonenumber-js return pretty value of phone number. In Error case return user's target value.
 * */
const prettyValue = computed(() => prettifyPhoneValue(props.modelValue))

// Метод просто добавляет + в начало строки, если его там ещё нет
function addPlus(str: string) {
	if (!str.length) return '';
	return str.startsWith('+') ? str : '+' + str
}

function prettifyPhoneValue(value: unknown) {
	try {
		if (typeof value !=='string') return '';
		return new AsYouType().input(addPlus(value))
	} catch (e) {
		return props.modelValue;
	}
}
const countryCode = computed(() => {
	try {
		return parsePhoneNumber(addPlus(props.modelValue)).country?.toLocaleLowerCase();
    } catch (e) {
		return "";
    }
})

function onInput(e: any) {
	const value = parseTelStr(e.target.value);

	emit('update:modelValue', value);
}

/**
 * @description Put just numeric
 */
function parseTelStr(a: string) {
	return a.replace(/\D+/g, '');
}

</script>

<style scoped>
    .container-input-tel{
        display: flex;
        height: var(--vf-input-height);

	    border-radius: var(--vf-input-border-radius);
	    border: var(--vf-input-border);
        background-color: var(--vf-input-background);
    }
    .container-input-tel_disabled{
	    background-color: var(--vf-input-background-disabled);
    }
	.container-input-tel:focus-within {
		border: var(--vf-input-border-focus);
	}
    .input-tel{
		font-size: var(--vf-input-font-size);
	    color: var(--vf-input-color);
        flex-grow: 1;
    }
	.container-input-tel_error {
		border: var(--vf-input-border-error);
	}
</style>