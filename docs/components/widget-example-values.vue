<template>
    <input-field type = "text" name = "user" label = "Username"/>
    <input-field type = "text" name = "age" label = "Age"/>

    <button type = "button" @click = "set">Set values</button>

    <div class = "language-json">
        <pre><code ref = "test"></code></pre>
    </div>
</template>
<script setup>
    import {Form, InputField} from "../../plugin";
    import hljs from 'highlight.js';

    import {onUnmounted, ref} from "vue";
    const form = new Form({});

    const test = ref();

    function set(){
        form.setValues({
            user: 'Jenesius',
            age : 23
        })
    }

    const id = setInterval(() => {
        test.value.innerHTML = JSON.stringify(form.values, null, "  ");
        hljs.highlightElement(test.value)
    }, 150);

    onUnmounted(() => {
        clearInterval(id);
    })

</script>
