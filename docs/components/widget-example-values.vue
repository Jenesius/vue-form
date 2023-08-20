<template>
    <input-field type = "text" name = "username" label = "Username"/>
    <input-field type = "text" name = "email" label = "Email"/>

    <div class = "language-json">
        <pre><code ref = "test"></code></pre>
    </div>
</template>
<script setup>
    import {Form, InputField} from "../../src";
    import {ref} from "vue";

    const form = new Form({});
    const test = ref();

    form.on('value', () => {
        test.value.innerHTML = JSON.stringify(form.values, null, "  ");
    })

    function set(){
        form.setValues({
            user: 'Jenesius',
            age : 23
        })
    }
</script>

