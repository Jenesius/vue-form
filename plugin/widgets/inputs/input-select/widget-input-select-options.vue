<template>
    <div class = "select-options">
        <p
            class = "select-options-item"
            :class = "{'select-options-item_active': value === option.value}"
            v-for = "option in options"
            :key = "option.value"

            @click = "$emit('select', option.value)"
        >{{option.title}}</p>
    </div>
</template>

<script setup lang = "ts">
    import {OptionRow} from "../../../types";

    defineProps<{
        options: OptionRow[],
        value: any
    }>()
</script>

<style scoped>
    .select-options{
        background-color: white;
        z-index: 2;
        position: relative;
        padding: 2px 2px;

        transition: max-height 200ms;
        max-height: 200px;
    }
    .select-options-item{
        padding: 8px 6px;
        margin: 0;

        color: #333333;
        font-size: 13px;
        transition: background-color 0.2s;
    }
    .select-options-item:hover{
        background-color: #f8f8f8;
    }
    .select-options-item_active{
        background-color: #f4f4f4 !important;
        border-radius: 3px;
    }
</style>
