<template>
    <div class = "widget-input-wrap">

        <p v-if = "label" class = "widget-input__label">{{label}}</p>

        <slot/>
        <!--Errors-->
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        label?: string
    }>()
</script>

<style scoped>
    .widget-input-wrap{
        display: flex;
        flex-direction: column;
    }
    .widget-input__label{
        color: #333;
        font-size: 13px;
        margin: 4px 0;
    }
</style>
