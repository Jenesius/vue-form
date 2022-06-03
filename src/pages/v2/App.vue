<template>

    <new-input-field name = "test-1"/>
    <new-input-field name = "test-2"/>
    <new-input-field name = "a.b.c.d.e.f"/>
    <new-address-field name = "address"/>

    <new-input-field name="address.city"/>
    <new-input-field name="address.description"/>
    <new-input-field name="address.code.title"/>



    <br/>

    <div v-html="valueJson"></div>

</template>

<script setup lang = 'ts'>
    import { ref} from "vue";
    import {ValidationRule} from "../../../plugin/types";
    import useFormState from "../../../plugin/hooks/useFormState";
    import NewInputField from "@/components/v2/new-input-field.vue";
    import NewAddressField from "@/components/v2/new-address-field.vue";
    import {Form} from "../../../plugin";


    const form = new Form({

    });
    form.setValues({
        address: {city: 'Mogilev', description: '111'}
    })

    const formReactiveState = useFormState(form);



    setTimeout(() => {
        form.emit('read');
    }, 2000);



    /* @ts-ignore */
    window.form = form;




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



    const valueJson = ref(null);




    setInterval(() => {

        valueJson.value = syntaxHighlight(form.getValues());

    }, 100);


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
