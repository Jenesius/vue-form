<template>
    <input-wrap :label = "label">
        <div class = "container-input-checkbox">
			<element-input-checkbox
				v-for = "item in options"
				:key = "item.value"
				:model-value="isActive(item.value)"
				:disabled="disabled"
				:label = "item.label || item.title"

				@click = "onInput(item.value)"
				@keyup.enter="onInput(item.value)"
			/>
        </div>
    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
    import {OptionRow} from "../../../types";
	import ElementInputCheckbox from "./element-input-checkbox.vue";

    const props = defineProps<{
        label?: string,
        options: OptionRow[],
        modelValue: any,
        disabled: boolean
    }>()

    function isActive(v: unknown) {
        return props.modelValue?.includes?.(v);
    }
    function toggle(v: unknown) {
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

    function onInput(v: unknown) {
        if (props.disabled) return;
        emit('update:modelValue', toggle(v))
    }

</script>

<style scoped>
    .container-input-checkbox {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
</style>
