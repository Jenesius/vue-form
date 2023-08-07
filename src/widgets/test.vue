<template>
    <component
            :is="componentItem"
            :name="name"
            :key = name

            :modelValue="input.value"
            @update:modelValue = "handleInput"

            :disabled = "input.disabled"
            :changed  = "input.changed"
            :errors="input.errors"
    />
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, reactive} from "vue";
import {getFieldType} from "../config/store";
import Form from "../classes/Form";
import {FormInputValidationCallback} from "../types";

interface IProps {
    name: string,
    type?: string,
    validation?: FormInputValidationCallback[]
}
const props = defineProps<IProps>()
const parentForm = Form.getParentForm();
const componentItem = computed(() => getFieldType(props.type));


function handleInput(value: any) {
    console.log("++", value)
    parentForm?.setValues({ [props.name]: value });
}


function useFormInput(name: string) {

    const parentForm = Form.getParentForm() as Form

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
        validation() {
            const result = validation.reduce((acc: (string | boolean)[], guard) => {
                const guardResult = guard(input.value);
                if (guardResult !== true) acc.push(guardResult);
                return acc;
            }, []);

            input.errors = result;
            return result.length
        }
    }


    onMounted(() => {
        parentForm.subscribe(InputDependency)
    })
    onUnmounted(() => {
        parentForm.unsubscribe(InputDependency);
    })

    function setValidation(array: FormInputValidationCallback[]) {
        validation = array;
    }

    return input;
}

const input = useFormInput(props.name);

window[`test-${props.name}`] = input

</script>
<style>

</style>
