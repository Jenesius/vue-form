<template>
    <div class = "container-input-wrap">
        <p v-if = "label" class = "container-input-wrap-label">{{label}}</p>
        <slot/>
        <!--Errors-->
        <div class = "container-error-wrap" v-if = "errors && errors.length > 0">
            <p
                class = "container-error-wrap-label"
                v-for = "(str, index) in errors"
                :key = "index"
            >{{str}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        label?: string,
        errors?: string[]
    }>()
</script>

<style scoped>
    .container-input-wrap{
        display: flex;
        flex-direction: column;
    }
    .container-input-wrap-label{
        color: var(--vf-input-label-color);
        font-size: 13px;
        margin: 4px 0;
    }
    .container-error-wrap{
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 5px 0;
    }
    .container-error-wrap-label{
        color: var(--vf-input-error);
        margin: 0;
        font-size: 15px;
    }
</style>
