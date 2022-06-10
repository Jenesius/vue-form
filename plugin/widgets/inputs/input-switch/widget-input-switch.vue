<template>
    <input-wrap>
        <div class = "input-switch-container">
            <div class = "input-switch"
                 @click = "onInput()"
                 :class = "{
                     'input-switch_disabled': disabled
                 }"
            >
                <div class = "input-switch-button"
                     :class = "{
                    'input-switch-button_active': !!modelValue
                }"
                ></div>
            </div>
            <p class = "input-switch-title widget-input-title">123</p>
        </div>

    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";

    const props = defineProps<{
        label?: string,
        modelValue: any,
        disabled: boolean
    }>()


    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function onInput(v = !props.modelValue) {
        if (props.disabled) return;
        emit('update:modelValue', v)
    }

</script>

<style scoped>
    .input-switch-container{
        display: flex;
        gap: 12px;
        align-items: center;
    }
    .input-switch {
        width: 38px;
        border-radius: 11px;
        border: 1px solid #c8c8c8;
        height: 21px;
        outline: none;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .input-switch-button{
        height: 15px;
        width: 15px;
        background-color: #c8c8c8;
        border-radius: 50%;
        transform: translateX(3px);
        transition: transform 0.1s, color 0.1s;
    }
    .input-switch-button_active{
        background-color: #4e74ff;
        transform: translateX(18px);
    }
    .input-switch-title{
        margin: 0;
        color: #333;
    }
    .input-switch_disabled{
        background-color: #e9e9e9;
        cursor: default;
    }
    .input-switch_disabled .input-switch-button_active{
        background-color: #bac7f8;
    }
</style>
