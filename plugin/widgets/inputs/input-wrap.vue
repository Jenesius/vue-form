<template>
    <div class = "widget-input-wrap">

        <p v-if = "label" class = "widget-input__label">{{label}}</p>

        <slot/>
        <!--Errors-->

        <div class = "input-errors">
            <p
                class = "input-error-label"
                v-for = "(str, index) in errors"
                :key = "index"
            >{{str}}</p>

        </div>

    </div>
</template>

<script setup lang="ts">
    defineProps<{
        label?: string,
        errors: string[]
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
    .input-errors{
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 5px 0;
    }
    .input-error-label{
        color: red;
        margin: 0;
        font-size: 15px;
    }
</style>
