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
