<template>
    <input-wrap :label = "label" :errors = "errors">

        <div
            class = "input-radio-container"
            :tabindex="disabled? -1 : 0"
            ref = "refInputRadioContainer"
        >
			<element-input-radio
				v-for = "item in options"
				:key = "item.value"

				:model-value="modelValue === item.value"
				:disabled="disabled"
				:label="item.label || item.title"
				:error="!!errors.length"
				@click = "onInput(item.value)"
			/>

        </div>

    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
    import {OptionRow} from "../../../types";
    import {onMounted, ref} from "vue";
    import updateInputPosition from "../../../utils/update-input-position";
	import ElementInputRadio from "./element-input-radio.vue";

    const props = defineProps<{
        label?: string,
        options: OptionRow[],
        modelValue: any,
        disabled: boolean,
		errors: string[],
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function onInput(v:void) {
        if (props.disabled) return;
        emit('update:modelValue', v)
    }

    const refInputRadioContainer = ref<HTMLElement>();



    onMounted(() => {

      refInputRadioContainer.value?.addEventListener("keydown", e => {
        switch (e.code) {
          case "ArrowDown": e.preventDefault(); updateInputPosition({options: props.options, value: props.modelValue, onInput, duration: 1}); break;
          case "ArrowUp": e.preventDefault(); updateInputPosition({options: props.options, value: props.modelValue, onInput, duration: -1}); break;
        }
      })

    })

</script>

<style scoped>
    .input-radio-container{
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    .input-radio-container:focus{
      outline: none;
    }
    .input-radio-container:focus .input-radio-button{
      border-color: #b2b2b2;
    }


</style>
