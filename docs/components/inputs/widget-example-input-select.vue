<template>
    <input-field type = "select" :options = "array" v-model = "value"/>
    <p>Value: {{value}}</p>
</template>

<script setup>
    import {InputField} from "../../../plugin";
    import {ref} from "vue";

    const value = ref(null);
    const array = [
        {
            label: 'Red color',
            value: 'red'
        },
        {
            label: 'Green color',
            value: 'green'
        },
        {
            label: 'Blue color',
            value: 'blue'
        },
        {
            label: 'Transparent',
            value: null
        },
		{
			label: 'Back color',
			value: 'black'
		},
		{
			label: 'White color',
			value: 'white'
		},
		{
			label: "Yellow color",
			value: 'yellow'
		}
    ]

</script>

<style scoped>

</style>
