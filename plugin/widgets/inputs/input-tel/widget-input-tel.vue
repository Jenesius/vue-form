<template>
    <widget-wrap :label = "label">
        <div class = "container-input-tel" @click = "inputTel?.focus()"             :class = "{
                    'input-tel_disabled': disabled
                }">
            <widget-input-tel-code :country-code="countryCode"/>
            <input type = "text" class = "input-tel" ref = "inputTel"
                   @input = "onInput"
                   :value = "prettyValue"
                   :disabled = "disabled"
				   :autofocus="autofocus"
            >
        </div>
    </widget-wrap>
</template>

<script setup lang = "ts">
import WidgetWrap from "./../input-wrap.vue";
import WidgetInputTelCode from "./widget-input-tel-code.vue";
import {computed, ref} from "vue";
import {parsePhoneNumber, AsYouType} from 'libphonenumber-js'

interface Props {
	label?: string,
	errors: string[],
	modelValue: any,
	disabled: boolean,
	autofocus: boolean
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
const prettyValue = computed(() => {
	try {
		return new AsYouType().input(props.modelValue)
    } catch (e) {
		return props.modelValue;
    }
})
const countryCode = computed(() => {
	try {
		return parsePhoneNumber(props.modelValue).country?.toLocaleLowerCase();
    } catch (e) {
		return "";
    }
})

/**
 * @description Put just numeric and start +
 */
function parseTelStr(a: string) {
	const numericStr = a.replace(/\D+/g, '');
	return '+' + numericStr;
}

function onInput(e: any) {
	const value = parseTelStr(e.target.value);

	emit('update:modelValue', value)
}


</script>

<style scoped>
    .container-input-tel{
        display: flex;
        height: 35px;
        max-height: 35px;

	    border-radius: 4px;
	    border: 1px solid #c8c8c8;
        background-color: white;
    }
    .input-tel_disabled{
	    background-color: #e9e9e9;
    }
    .input-tel{
        border: 0;
        outline: none;
        background-color: transparent;

	    color: #1c1c1c;
        flex-grow: 1;
    }
</style>