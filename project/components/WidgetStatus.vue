<template>
    <div class = "widget-status" :class = "'widget-status_' + status">
        <p>{{title}}</p>
        <span class = "widget-status__separator"> </span>
        <p>{{value}}</p>
    </div>
</template>

<script setup lang = "ts">
     defineProps<{
        title: string,
        value: any,
        status: string
    }>()
</script>

<style scoped>
    .widget-status{
        width: fit-content;
        padding: 5px 10px;
        align-items: center;
        display: flex;
        font-size: 14px;
        line-height: 18px;
        gap: 10px;
        border-radius: 3px;
    }
    .widget-status>p{
        margin: 0;
    }
    .widget-status_error{
        background-color: #e05454;
        color: white;
    }
    .widget-status_success{
        background-color: green;
        color: white;
    }
    .widget-status__separator{
        height: 14px;
        width: 1px;
        min-width: 1px;
        background-color: #ebebeb7a;
    }
</style>
