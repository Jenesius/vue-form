<template>

    <new-input-field name = "test-1"/>
    <new-input-field name = "test-2"/>
    <new-input-field name = "a.b.c.d.e.f"/>
    <new-address-field name = "address"/>

    <new-input-field name="address.city"/>
    <new-input-field name="address.description"/>

    <button @click = "ts">test</button>

    <div class = "flex gap_10">
        <widget-status title="Form changed" :value = "formReactiveState.changed" :status = "!!formReactiveState.changed? 'success' : 'error'"/>
        <widget-status title="Form validated" :value = "isFormValidate" :status = "!!isFormValidate? 'success' : 'error'"/>
        <widget-status title="Form disabled" :value = "formReactiveState.disabled" :status = "!!formReactiveState.disabled? 'success' : 'error'"/>
    </div>
    <!--
    <div class = "app-wrap flex-column">
        <input-field name = 'login' :rules = "[noEmpty]" />
        <input-field name = 'name' :rules = "[noEmpty]" />

        <input-field name="age"  :rules = "[noEmpty]"/>

        <input-address name = "address" />

        <p>Form-field</p>
        <form-field name = "number"/>
        <form-field name = "location"/>
        <form-field name = "date"/>

    </div>
-->
    <br/>

    <div class = "flex">
        <button @click = "form.setValues({'login': Math.floor(Math.random() * 1000)})">change login</button>
        <button @click = "setDefaultValues"> Default </button>
        <button @click = "validate"> Validate </button>
        <button @click = "form.disabled?form.enable():form.disable()"> Disable </button>
        <button @click = "form.disable('login')"> Disable Login </button>
        <button @click = "form.enable('login')"> Enable Login </button>
        <button @click = "form.hideFields('name')"> Hide Name </button>
        <button @click = "form.showFields('name')"> Show Name </button>
        <button @click = "form.showFields()"> Show All </button>

        <button @click = "toggle('name')">S/H name</button>
        <button @click = "toggle('age')">S/H age</button>
        <button @click = "toggle('login')">S/H login</button>
        <button @click = "toggle('address')">S/H address</button>
    </div>


    <p>{{times}}</p>
    <div v-html="valueJson"></div>
    <div v-html="changesJson"></div>
    <div>{{form.hiddenFields}}</div>

</template>

<script setup lang = 'ts'>
    /* eslint-disable */

    import {Form} from "../plugin/classes/Form";
    import InputField from "@/components/InputField.vue";
    import InputCoordinate from "@/components/input-coordinate.vue";

    import { ref} from "vue";
    import InputAddress from "@/components/InputAddress.vue";
    import WidgetStatus from "@/components/WidgetStatus.vue";
    import {ValidationRule} from "../plugin/types";
    import useFormState from "../plugin/hooks/useFormState";
    import FormField from "@/components/form-field.vue";
    import NewInputField from "@/components/v2/new-input-field.vue";
    import NewAddressField from "@/components/v2/new-address-field.vue";

    function metadata(form: Form) {


        form.on('metadata-depend-new-proxy-field', (c: any) => {

            if (c.name === 'location') c.setComponent(InputAddress);
            else if (c.name === 'date') c.setComponent(InputCoordinate)
            else  c.setComponent(InputField);
        })
    }

    const form = new Form({
        plugins: [metadata]
    });
    form.setValues({
        address: {city: 'Mogilev', description: '111'}
    })

    const formReactiveState = useFormState(form);

    function ts() {
        form.changeByName('address', {
            city: '5',
            description: '100'
        })
    }

    setTimeout(() => {
        form.emit('read');
    }, 2000);



    /* @ts-ignore */
    window.form = form;
    form.setValues({age: 11}, {change: false})

    function toggle(name: string) {
        form.isHidden(name)? form.showFields(name) : form.hideFields(name);
    }

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
                city: 'test',
                country: "Mogilev"
            }
        }, {
            change: false
        })

    }

    const valueJson = ref(null);
    const changesJson = ref(null);
    const times = ref(0);


    const isFormValidate = ref(true);

    function validate() {
        isFormValidate.value = form.validate();
    }

    setInterval(() => {
        times.value = 1 + times.value
        valueJson.value = syntaxHighlight(form.getValues());
        changesJson.value = syntaxHighlight(form.getChanges());
    }, 100);

    const noEmpty:ValidationRule = (x: any) => !!x || 'Field can`t be empty.';

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
