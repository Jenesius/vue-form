<template>
    <input-wrap :label = "label">
        <div class = "container__input-select-wrap" ref = "inputSelectWrap">
            <div class = "input-select"
                :class = "{
                    'input-select_disabled': disabled
                }"
            >

                <widget-input-select-current
                    :title = "title"
                    :active = "active"
                    @click = "setActive()"
                />

                <transition name="fade">
                    <widget-input-select-options
                        v-if = "active"
                        :value = "modelValue"
                        :options = "options"
                        @select = "onInput($event), setActive(false)"
                    />
                </transition>

            </div>
        </div>
    </input-wrap>
</template>

<script setup lang = "ts">

    import {OptionRow} from "../../../types";
    import {computed, ref} from "vue";
    import clickOutside from "../../../utils/click-outside";
    import InputWrap from "../input-wrap.vue";
    import WidgetInputSelectOptions from "./widget-input-select-options.vue";
    import WidgetInputSelectCurrent from "./widget-input-select-current.vue";

    const props = defineProps<{
        label?: string,
        modelValue: any,
        disabled?: boolean,
        options: OptionRow[],
        placeholder?: string
    }>()

    const inputSelectWrap = ref();
    const active = ref(false);

    let off:any;

    function setActive(v = !active.value) {

        if (props.disabled) return active.value = false;

        if (v) {
            off = clickOutside(inputSelectWrap.value, setActive.bind(null, false))
        }else {
            off?.();
        }

        active.value = v;
    }

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): voide
    }>()

    function onInput(v) {
        if (props.disabled) return;
        emit('update:modelValue', v)
    }

    const title = computed(() => {

        const selected = props.options.find(x => x.value === props.modelValue);
        if (selected) return selected.title;

        return props.placeholder || '';

    })

</script>

<style scoped>

    .container__input-select-wrap{
        height: 35px;
        max-height: 35px;
    }
    .input-select{
        border: 1px solid #c8c8c8;
        border-radius: 4px;
        color: #1c1c1c;
        cursor: pointer;
        overflow: hidden;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: max-height 0.2s;
    }

    .fade-enter-from,
    .fade-leave-to {
        max-height: 0;
    }


    .input-select_disabled{
        background-color: #e9e9e9;
        cursor: default;
    }




</style>
