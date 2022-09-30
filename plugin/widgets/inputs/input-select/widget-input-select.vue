<template>
    <input-wrap :label = "label" :errors = "errors">
        <div class = "container__input-select-wrap" ref = "inputSelectWrap">
            <div class = "input-select"
                :class = "{
                    'input-select_disabled': disabled,
                    'input-select_error': errors.length
                }"
                 :tabindex="!disabled? 0 : null"
                 @focusout = "deactivate()"
                 @keyup.enter = "setActive()"
                 ref = "refInputSelect"

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
    import {computed, onMounted, ref} from "vue";
    import InputWrap from "../input-wrap.vue";
    import WidgetInputSelectOptions from "./widget-input-select-options.vue";
    import WidgetInputSelectCurrent from "./widget-input-select-current.vue";
    import updateInputPosition from "../../../utils/update-input-position";

    const props = defineProps<{
        label?: string,
        modelValue: any,
        disabled?: boolean,
        options: OptionRow[],
        placeholder?: string,
		errors: string[],
    }>()

    const refInputSelect = ref<HTMLElement>()
    const inputSelectWrap = ref();
    const active = ref(false);


    function setActive(v = !active.value) {
        if (props.disabled) return active.value = false;
        active.value = v;
    }

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function onInput(v: any) {
        if (props.disabled) return;
        emit('update:modelValue', v)
    }

    const title = computed(() => {

        const selected = props.options.find(x => x.value === props.modelValue);
        if (selected) return selected.title;

        return props.placeholder || '';

    })

    function deactivate() {
      console.log('+')
      setActive(false);
    }

    onMounted(() => {

      refInputSelect.value?.addEventListener("keydown", e => {

        switch (e.code) {
          case "ArrowDown": e.preventDefault(); updateInputPosition({options: props.options, value: props.modelValue, onInput, duration: 1}); break;
          case "ArrowUp": e.preventDefault(); updateInputPosition({options: props.options, value: props.modelValue, onInput, duration: -1}); break;
        }
      })

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
        background-color: white;
		position: relative;
      outline: none;
    }
    .input-select:focus{
      border-color: #b2b2b2;
    }
	.input-select_error{
		border: 1px solid red;
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
