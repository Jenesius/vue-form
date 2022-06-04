<template>

    <div>
        <p>Name</p>
        <new-input-field name = "name"/>
        <new-input-field name = "name"/>
    </div>
    <div>
        <p>Age</p>
        <new-input-field name = "age"/>
    </div>
    <div>
        <p>User.account.private.login</p>
        <new-input-field name = "uer.account.private.login"/>
    </div>

    <div class = "flex" >
        <new-address-field name = "address" v-if = "state.address"/>
        <div>
            <button @click = "state.address = !state.address">toggle</button>
        </div>
    </div>

    <div class = "flex">
        <div v-if = "state.city">
            <p>Address.city</p>
            <new-input-field name="address.city"/>
        </div>
        <div>
            <button @click = "state.city = !state.city">toggle</button>
        </div>
    </div>
    <div>
        <p>Address.description</p>
        <new-input-field name="address.description"/>
    </div>
    <div>
        <p>Address.code.title</p>
        <new-input-field name="address.code.title"/>
    </div>

    <br/>

    <div v-html="valueJson"></div>

</template>

<script setup lang = 'ts'>
    import {reactive, ref} from "vue";
    import NewInputField from "@/components/v2/new-input-field.vue";
    import NewAddressField from "@/components/v2/new-address-field.vue";
    import Form from "../../../plugin/classes/Form";


    const form = new Form();

    const state = reactive({
        city: true,
        address: true
    })

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

        valueJson.value = syntaxHighlight(form.values);

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

    p{
        color: #0262a4;
        font-size: 12px;
        margin: 4px 0;
    }
    span{
        color: #02a425;
        font-size: 12px;
        margin: 4px 0;
        min-width: 200px;
    }
    .flex{
        display: flex;
    }
</style>
