<template>
    <p class = "address-title">Address</p>
    <input-field name = "city" label = "City"/>
</template>

<script setup lang="ts">
    import InputField from "../../../plugin/widgets/input-field.vue";
    import {useProxyState} from "../../../plugin";

    const props = defineProps<{
        name: string
    }>()

    useProxyState(props.name)

</script>

<style scoped>
    .address-title{
        margin: 10px 0 5px;
        font-weight: bold;
    }
</style>
