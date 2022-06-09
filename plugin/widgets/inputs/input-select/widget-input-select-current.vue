<template>
    <div class = "input-select__current">
        <p class = "input-select-title">{{title}}</p>

        <i class="arrow down"
           :class = "{'arrow_active': active}"
        ></i>
    </div>
</template>

<script setup lang = "ts">
    defineProps<{
        active: boolean,
        title: string
    }>()

</script>

<style scoped>
    .arrow {
        border: solid #424242;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        margin: 8px 10px 10px 10px;
        transition: transform 150ms;
    }
    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
    .arrow_active{
        transform: rotate(225deg);
    }
    .input-select__current{
        height: 35px;
        display: flex;
        align-items: center;
    }
    .input-select-title{
        padding: 0 6px;
        color: #1c1c1c;
        font-size: 14px;

        flex-grow: 1;
    }
</style>
