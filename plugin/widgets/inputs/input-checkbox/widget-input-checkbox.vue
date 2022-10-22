<template>
    <input-wrap :label = "label">
        <div class = "input-checkbox-container">
            <div
                v-for = "item in options"
                :key = "item"
                class = "input-checkbox"

                @click = "onInput(item.value)"
            >
                <div
                    class = "input-checkbox-button"
                    :class = "{
                        'input-checkbox_active': isActive(item.value),
                        'input-checkbox_disabled': disabled,
                    }"
                >
                    <i class = "check"/>
                </div>
                <p class = "input-checkbox-title">{{item.title}}</p>
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

    function isActive(v) {
        return props.modelValue?.includes?.(v);
    }
    function toggle(v) {
        const arr:any[] = Array.isArray(props.modelValue)? props.modelValue: [];

        const index = arr.indexOf(v);
        if (index === -1) {
            arr.push(v);
        } else arr.splice(index, 1);

        return arr;
    }

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function onInput(v) {
        if (props.disabled) return;
        emit('update:modelValue', toggle(v))
    }

</script>

<style scoped>
    .input-checkbox-container {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    .input-checkbox-button{
        width: 18px;
        height: 18px;
        margin: 0;
        border: 1px solid #c8c8c8;
        background-color: white;
        border-radius: 3px;
        display: grid;
        place-content: center;
    }
    .input-checkbox_active{
        background-color: #4e74ff;
    }

    .input-checkbox_disabled{
        background-color: #e9e9e9;
    }
    .input-checkbox_disabled.input-checkbox_active{
        background-color: #bac7f8;
    }

    .input-checkbox{
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 13px;
    }
    .input-checkbox_disabled{
        cursor: default;
    }

    .input-checkbox-title{
        color: #1c1c1c;
        margin: 0;
    }
    i.check {
        display: none;
        width: 4px;
        height: 7px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate( 45deg);
        margin: 1px 1px 4px 1px;
    }
    .input-checkbox_active>i{
        display: inline-block;
    }
</style>
