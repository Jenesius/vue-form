<template>
    <div class = "" :class = "{'input-field_disabled': state.disabled}"
        v-if = "!input.hidden"
    >
        <div class = "input-field-wrap">
            <div class = "input-field__name">{{name}}</div>
            <input type = 'text' class = "input-field"
                   @input = "input.setChange($event.target.value)"
                   :value = "state.value"
            >
        </div>
        <p
            class = "input-field__error"
            v-for = "(msg, index) in input.errors"
            :key = index
        >{{msg}}</p>
    </div>

</template>

<script setup lang = 'ts'>
    import {
        Input,
        InputInterface, useInputState,
    } from "../../plugin/classes/Input";
    import {ValidationRule} from "../../plugin/types";
    import buildDepend from "../../plugin/methods/build-depend";

    const props = defineProps<{
        name: string,
        rules?:   ValidationRule[] | ValidationRule
    }>()


    function init() : InputInterface{

        let validation: any[] = [];
        if (props.rules) validation = Array.isArray(props.rules)?props.rules: [props.rules];

        return new Input({
            name: props.name,
            validation: validation
        });
    }

    const input = buildDepend(props.name, init);
    const state = useInputState(input);

</script>

<style scoped>
    .input-field-wrap{
        border: 1px solid #c7c5c5;
        display: flex;
        border-radius: 4px;
        overflow: hidden;
    }
    .input-field__name{
        display: flex;
        align-items: center;
        background-color: #f2f2f2;
        padding: 0 10px;
        color: #bab9b9;
        width: 100px;
        border-radius: 0 5px 5px 0;
    }
    .input-field{
        flex-grow: 1;
        height: 35px;

        border: 0;
        outline: 0;

        font-size: 14px;
        border-radius: 4px;

        padding: 0 10px;
    }
    .input-field__error{
        color: red;
        margin: 2px;
        font-size: 14px;
        line-height: 18px;
    }
    .input-field_disabled .input-field{
        background-color: #bebcbc;
    }
</style>
