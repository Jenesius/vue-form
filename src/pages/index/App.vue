<template>
    <div>
        <p>Test v-model</p>
        <input-field  type = "select" v-model = "test" :options = "array"/>
        <p>Value: {{test}}</p>

    </div>
</template>

<script setup lang = 'ts'>
    import InputField from "../../../plugin/widgets/input-field.vue";
    import {ref} from "vue";

    const test = ref('2');
    const array = [
        { title: 'test', value: '1'},
        { title: 'test2', value: '2'}
    ]

</script>

<style>


</style>
