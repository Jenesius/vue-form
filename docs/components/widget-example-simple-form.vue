<template>
    <input-field label = "Note" type = "text" name = "note"/>
    <input-field label = "Planet" type = "select" name = "planet" :options = "arr" />
    <button @click = "show">values</button>
</template>
<script setup>
    import {Form, InputField} from "./../../plugin"
    const form = new Form();
    const arr = [ {value: 1, title: 'Earth'} ]

    function show() {
        alert(JSON.stringify(form.values, null, "   "))
    }
</script>
