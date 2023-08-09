<template>
	<component
		:is="componentItem"
		:name="name"
		:key = name

		:modelValue="input?.value"
		@update:modelValue = "handleInput"

        :disabled = "input?.disabled"
        :changed  = "input?.changed"
        :errors="input?.errors || []"
	/>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, reactive} from "vue";
import {getFieldType} from "../config/store";
import Form from "../classes/Form";
import {FormInputValidationCallback} from "../types";
import STORE from "../../plugin/config/store";

interface IProps {
	name: string,
	type?: string,
    validation?: FormInputValidationCallback[] | FormInputValidationCallback,
    required?: boolean
}
const props = defineProps<IProps>()
const parentForm = Form.getParentForm();
const componentItem = computed(() => getFieldType(props.type));


function handleInput(value: any) {
	parentForm?.change({ [props.name]: value });
}


function useFormInput(name: string) {

    const parentForm = Form.getParentForm();

    if (!parentForm) return null;

    let validation: FormInputValidationCallback[] = []

    const input = reactive<Partial<{
        value?: any,
        changed?: boolean,
        disabled?: boolean,
        errors: (string | boolean)[],
        setValidation(arr: FormInputValidationCallback[]): void
    }>>({})

    function updateInput() {
        input.value = parentForm.getValueByName(name);
        input.changed = parentForm.checkFieldChange(name);
    }
    function updateAvailability() {
        input.disabled = parentForm.checkFieldDisable(name);
    }

    parentForm.oninput(name, updateInput)
    parentForm.onavailable(name, updateAvailability)

    updateInput();
    updateAvailability();
    input.setValidation = setValidation;

    const InputDependency = {
        name,
        validate() {

            console.log("Input validation:", validation, input.value);
            const result = validation.reduce((acc: (string | boolean)[], guard) => {
                const guardResult = guard(input.value);
                if (guardResult !== true) acc.push(guardResult);
                return acc;
            }, []);

            input.errors = result;
            return result.length === 0
        }
    }


    onMounted(() => {
        parentForm.subscribe(InputDependency)
    })
    onUnmounted(() => {
        parentForm.unsubscribe(InputDependency);
    })

    function setValidation(array?: FormInputValidationCallback[] | FormInputValidationCallback) {
        validation = typeof array === 'function' ? [array] : (array || []);
    }

    return input;
}

function mergeValidation() {
    const arr:FormInputValidationCallback[] = [];
    if (props.validation) {
        if (typeof props.validation === 'function') arr.push(props.validation);
        else arr.push(...props.validation)
    }

    if (props.required) arr.unshift((v: any) => !!v || STORE.requiredMessage)

    return arr;
}

const input = useFormInput(props.name)
// @ts-ignore;
input?.setValidation(mergeValidation())

</script>
<style>

</style>
