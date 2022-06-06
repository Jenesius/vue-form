<template>
    <div >
        <input-field name = "x" placeholder = "x"/>
        <input-field name = "y" placeholder = "y"/>
    </div>
</template>

<script setup lang = "ts">
    import InputField from "@/components/InputField.vue";
    import buildDepend from "../../plugin/methods/build-depend";


    const props = defineProps<{
        name: string
    }>()


</script>

<style scoped>

</style>
