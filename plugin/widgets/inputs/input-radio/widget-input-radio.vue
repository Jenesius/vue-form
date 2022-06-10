<template>
    <input-wrap :label = "label">

        <div class = "input-radio-container"

        >
            <div class = "input-radio"
                 v-for = "item in options"
                 :key = "item.value"
                 @click = "onInput(item.value)"
                 :class = "{
                     'input-radio_active': modelValue === item.value,
                     'input-radio_disabled': disabled
                 }"
            >
                <div class = "input-radio-button">
                    <transition name = "fade">
                        <div class = "input-radio-button-active" v-if = "item.value === modelValue"></div>
                    </transition>
                </div>

                <p class = "input-radio-title">{{item.title}}</p>
            </div>
        </div>


    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
    import {OptionRow} from "../../../types";

    const props = defineProps<{
        label?: string,
        options: OptionRow[],
        modelValue: any,
        disabled: boolean
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): voide
    }>()

    function onInput(v) {
        if (props.disabled) return;
        emit('update:modelValue', v)
    }

</script>

<style scoped>
    .input-radio-container{
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    .input-radio{
        display: flex;
        gap: 13px;
        align-items: center;
        cursor: pointer;
    }
    .input-radio-button{
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 1px solid #c8c8c8;

        cursor: pointer;
        display: grid;
        place-items: center;
    }
    .input-radio-title{
        color: #1c1c1c;
        margin: 0;
    }

    .input-radio-button-active{
        height: 12px;
        width: 12px;

        border-radius: 50%;
        background-color: #4e74ff;
        border: 1px solid #f0f0f0;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: 0.3s;
    }

    .fade-enter-from,
    .fade-leave-to {
        transform: scale(0);
    }
    .input-radio_disabled{
        cursor: default;
    }
    .input-radio_disabled .input-radio-button{
        background-color: #e9e9e9;
    }
    .input-radio_disabled .input-radio-button-active{
        background-color: #bac7f8
    }
</style>
