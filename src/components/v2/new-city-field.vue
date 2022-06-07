<template>
    <div>
        <p>City</p>
        <new-input-field name = "name"/>
        <new-input-field name = "index"/>
    </div>
</template>

<script setup lang="ts">
    import NewInputField from "@/components/v2/new-input-field.vue";
    import {useProxyState} from "../../../plugin";


    const props = defineProps<{
        name: string
    }>()

    useProxyState(props.name)

</script>

<style scoped>

</style>
