<template>
    <div>
        <p>Test v-model</p>
        <input-field name = "1" type = "radio" v-model = "test" :options = "array" disabled />
        <input-field name = "2" type = "radio" v-model = "test" :options = "array" label = "Test"/>
        <input-field name = "3" type = "checkbox" v-model = "test2" :options = "array"/>
        <input-field name = "3" type = "checkbox" v-model = "test2" :options = "array" disabled/>
        <input-field name = "3" type = "switch" v-model = "test3"/>
        <input-field name = "3" type = "switch" v-model = "test3" disabled/>
        <p>Value: {{test3}}</p>

    </div>
</template>

<script setup lang = 'ts'>
    import InputField from "../../../plugin/widgets/input-field.vue";
    import {ref} from "vue";
    import {Form} from "../../../plugin";

    const form = new Form()
    window.form = form;

    const test = ref('2');
    const test2 = ref([]);
    const test3 = ref(false);
    const array = [
        { title: 'test', value: '1'},
        { title: 'test2', value: '2'}
    ]

</script>

<style>


</style>
