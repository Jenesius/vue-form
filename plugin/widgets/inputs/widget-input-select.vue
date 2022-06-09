<template>
    <div class = "container__input-select">
        <p v-if = "label" class = "widget-input__label">{{label}}</p>

        <div class = "container__input-select-wrap">
            <div class = "input-select">

                <div class = "input-select__current" @click = "active = !active">
                    <p class = "input-select-title">{{title}}</p>

                    <i class="arrow down"
                        :class = "{'arrow_active': active}"
                    ></i>

                </div>


                <transition name="fade">
                    <div class = "input-options" v-if = "active">
                        <p
                            class = "input-options-item"
                            :class = "{'input-options-item_active': modelValue === option.value}"
                            v-for = "option in options"
                            :key = "option.value"

                            @click = "$emit('update:modelValue', option.value)"
                        >{{option.title}}</p>
                    </div>
                </transition>

            </div>
        </div>
    </div>
</template>

<script setup lang = "ts">

    import {OptionRow} from "../../types";
    import {computed, ref} from "vue";

    const props = defineProps<{
        label?: string,
        modelValue: any,
        disabled?: boolean,
        options: OptionRow[],
        placeholder?: string
    }>()

    const active = ref(false);

    const title = computed(() => {

        const selected = props.options.find(x => x.value === props.modelValue);
        if (selected) return selected.title;

        return props.placeholder || '';

    })

</script>

<style scoped>
    .container__input-select{
        display: flex;
        flex-direction: column;
    }
    .container__input-select-wrap{
        height: 35px;
        max-height: 35px;
    }
    .input-select__current{
        height: 35px;
        display: flex;
        align-items: center;
    }

    .input-select{
        border: 1px solid #c8c8c8;
        border-radius: 4px;
        color: #1c1c1c;
        cursor: pointer;
        overflow: hidden;
    }
    .input-options{
        background-color: white;
        z-index: 1;
        position: relative;
        padding: 2px 2px;

        transition: max-height 200ms;
        max-height: 200px;
    }

    .input-select-title{
        padding: 0 6px;
        color: #1c1c1c;
        font-size: 14px;

        flex-grow: 1;
    }
    .input-options-item{
        padding: 8px 6px;
        margin: 0;

        color: #333333;
        font-size: 13px;
        transition: background-color 0.2s;
    }
    .input-options-item:hover{
        background-color: #f8f8f8;
    }
    .input-options-item_active{
        background-color: #f4f4f4 !important;
        border-radius: 3px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: max-height 0.2s;
    }

    .fade-enter-from,
    .fade-leave-to {
        max-height: 0;
    }

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
</style>
