<template>
    <div>
        <b><p class = "input-address__title">Address</p></b>
        <input-field name="city" label="City"/>
        <input-field name="street" label="Street"/>
        <input-field name="country" label="Country"/>
    </div>
</template>
<script setup lang="ts">
    import {InputField, useProxyState} from "./../../../plugin"

    const props = defineProps<{
        name: string
    }>();
    useProxyState(props.name);
</script>
<style>
    .input-address__title{
        margin: 0 !important;
    }
</style>
