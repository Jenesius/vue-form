<template>
    <div class = "">
        <div class = "input-field-wrap">
            <div class = "input-field__name">{{name}}</div>
            <input type = 'text' class = "input-field"
                   @input = "input.setValue($event.target.value)"
                   :value = "input.value"
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

    import {inject, defineProps} from "vue";
    import {Form} from "../../plugin/classes/Form";
    import {
        Input,
        InputInterface,
        InputParams
    } from "../../plugin/classes/Input";
    import {ValidationRule} from "../../plugin/types";



    const form = inject(Form.PROVIDE_NAME) as Form;
    const props = defineProps<{
        name: string,
        // eslint-disable-next-line no-unused-vars
        rules?:   ValidationRule[] | ValidationRule
    }>()



    function init() : InputInterface{

        console.log(`Initialize %c${props.name}`, 'color: green');

        const params: InputParams = {
            name: props.name,
        }

        if (props.rules) params.validation = Array.isArray(props.rules)?props.rules: [props.rules];

        const i = Input(params);
        form.depend(i);
        return i;

    }
    const input = form.restoreDependence(props.name) as InputInterface || init();







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
</style>
