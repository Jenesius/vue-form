<template>
    <div class = "flex gap_10">
        <widget-status title="Form changed" :value = "form.changed" :status = "!!form.changed? 'success' : 'error'"/>
        <widget-status title="Form validated" :value = "isFormValidate" :status = "!!isFormValidate? 'success' : 'error'"/>

    </div>
    <div class = "app-wrap flex-column">
        <input-field name = 'login' v-model = "state.login" v-if = "state.isLogin"/>
        <input-field name = 'name' :rules = "noEmpty" />

        <input-field name="age" v-if = "age"/>

        <input-address name = "address" v-if = "state.isAddress"/>

    </div>

    <br/>

    <button @click = "toggleAge">toggle age</button>
    <button @click = "state.isAddress = !state.isAddress">toggle address</button>
    <button @click = "state.isLogin = !state.isLogin">toggle login</button>
    <button @click = "form.setValues({'login': Math.floor(Math.random() * 1000)})">change login</button>
    <button @click = "setDefaultValues"> Default </button>
    <button @click = "validate"> Validate </button>

    <p>{{times}}</p>
    <div v-html="valueJson"></div>
</template>

<script setup lang = 'ts'>
    /* eslint-disable */

    import {Form} from "../plugin/classes/Form";
    import InputField from "@/components/InputField.vue";

    import {reactive, ref} from "vue";
    import InputAddress from "@/components/InputAddress.vue";
    import WidgetStatus from "@/components/WidgetStatus.vue";

    const form = new Form({});
    /* @ts-ignore */
    window.form = form;
    form.setValues({age: 11})

    const age = ref(true);
    function toggleAge() {
        age.value = !age.value;
    }
    const inputValue = ref();

    function syntaxHighlight(json: any) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: any) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    function setDefaultValues(){

        form.setValues({
            name: "jack",
            age: 15,
            address: {
                city: 'test'
            }
        })

    }

    const valueJson = ref(null);
    const times = ref(0);

    const state = reactive({
        isLogin: false,
        isAddress: false
    })

    const isFormValidate = ref(true);

    function validate() {
        isFormValidate.value = form.validate();

    }

    setInterval(() => {
        times.value = 1 + times.value
        valueJson.value = syntaxHighlight(form.getValues());
    }, 100);

    function noEmpty(x: any) {
        return !!x || 'Field can`t be empty.';
    }

</script>

<style>
    * {
        font-family: 'Open Sans', sans-serif;
    }
    pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }

    .flex{
        display: flex;
        gap: 10px;

    }
    .flex-column{
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .app-wrap{
        padding: 10px 0 25px 0;
    }

</style>
