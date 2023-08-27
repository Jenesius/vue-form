<template>
    <input-address name="address"/>
    <br/>
    <input-field name = "address.city" label = "Address.city"/>
    <div class = "language-json">
        <pre><code ref = "test"></code></pre>
    </div>
</template>
<script setup>
    import {InputField, Form} from "../../src";
    import InputAddress from "./inputs/widget-example-input-address.vue";
    import {ref} from "vue";

    const form = new Form();
    const test = ref();
    form.on('value', () => {
        test.value.innerHTML = JSON.stringify(form.values, null, "  ");
    })

</script>
