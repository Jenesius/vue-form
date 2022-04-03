<template>
    <p>Test</p>
    <div class = "flex">
        <input-field name = 'login' v-model = "state.login" v-if = "state.isLogin"/>
        <input-field name = 'name' />

        <input-field name="age" v-if = "age"/>

    </div>

    <button @click = "toggleAge">toggle age</button>
    <button @click = "state.isLogin = !state.isLogin">toggle login</button>
    <button @click = "form.setValues({'login': (new Date).toString()})">change login</button>

    <div v-html="valueJson"></div>
</template>

<script setup lang = 'ts'>
    /* eslint-disable */

    import {Form} from "../plugin/classes/Form";
    import InputField from "@/components/InputField.vue";

    import {reactive, ref} from "vue";

    const form = new Form({});
    window.form = form;

    const age = ref(true);
    function toggleAge() {
        age.value = !age.value;
    }
    const inputValue = ref();

    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
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

    const valueJson = ref(null);

    const state = reactive({
        isLogin: false
    })

    setInterval(() => {
        valueJson.value = syntaxHighlight(form.getValues());
    }, 100);

</script>

<style>
    pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }

    .flex{
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
</style>
