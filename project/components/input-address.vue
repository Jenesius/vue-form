<template>
    <div>
        <p class = "address-title"
            :class = "{
                'address-title_disabled': disabled
            }"
        >Address</p>
        <input-field name = "city" label = "City"/>
        <input-field name = "country" label = "Country"/>
    </div>
</template>

<script setup lang="ts">
    import {useProxyState, InputField} from "../../plugin";

    const props = defineProps<{
        name: string,
        disabled?: boolean
    }>()

    useProxyState(props.name)

</script>

<style scoped>
    .address-title{
        margin: 10px 0 5px;
        font-weight: bold;
    }
    .address-title_disabled{
        color: gray;
    }
</style>
