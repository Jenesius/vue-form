<template>
    <div >
        <input-field name = "x" placeholder = "x"/>
        <input-field name = "y" placeholder = "y"/>
    </div>
</template>

<script setup lang = "ts">
    import InputField from "@/components/InputField.vue";
    import buildDepend from "../../plugin/methods/build-depend";
    import {FormOld} from "../../plugin";

    const props = defineProps<{
        name: string
    }>()

    // eslint-disable-next-line no-unused-vars
    const form = buildDepend(props.name, () => new FormOld({name:props.name}))

</script>

<style scoped>

</style>
