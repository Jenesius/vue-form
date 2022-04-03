<template>
    <div class = "input-field-wrap">
        <div class = "input-field__name">{{name}}</div>
        <input type = 'text' class = "input-field"
               @input = "input.setValue($event.target.value)"
               :value = "input.state.value"
        >
    </div>

</template>

<script setup lang = 'ts'>

    import {inject, defineProps} from "vue";
    import {Form} from "../../plugin/classes/Form";
    import {Input} from "../../plugin/classes/Input";

    const form = inject(Form.PROVIDE_NAME) as Form;
    const props = defineProps<{
        name: string,
        modelValue?: any
    }>()



    function init() : Input{

        console.log(`Initialize %c${props.name}`, 'color: green');

        const i = new Input({name: props.name});
        form.depend(i);
        return i;

    }
    const input = form.restoreDependence(props.name) as Input || init();







</script>

<style scoped>
    .input-field-wrap{
        border: 1px solid #b2b2b2;
        display: flex;
        border-radius: 4px;
        overflow: hidden;
    }
    .input-field__name{
        display: flex;
        align-items: center;
        background-color: #e9e9e9;
        padding: 0 10px;
        color: #bab9b9;
        width: 100px;
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
</style>
