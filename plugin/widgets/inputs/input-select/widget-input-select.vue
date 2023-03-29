<template>
	<input-wrap :label="label" :errors="errors">
		<div class="container__input-select-wrap" ref="inputSelectWrap">
			<div class="input-select"
				 :class="{
                    'input-select_disabled': disabled,
                    'input-select_error': errors.length,
            		'input-select_active': active
				}"
				 @focusout = "deactivate()"
				 :tabindex="!disabled? 0 : null"
				 @keyup.enter="setActive()"
				 ref="refInputSelect"
			>
				<widget-input-select-current
					:title="title"
					:active="active"
					@click="setActive()"
					:disabled = "disabled"
				/>
				<transition name="fade">
					<div class = "widget-input-select__list" v-if="active">
						<widget-input-select-search
							v-if = "options.length > 6"
							v-model = "filter"

							@focusin = "setActive(true)"
							@focusout = "deactivate()"
						/>

						<div class = "widget-input-select__options-list">
							<p
								v-for = "option in filteredOptions"
								:key = "option.value"
								:class="{'widget-select-options-item_active': modelValue === option.value}"
								class="widget-select-options-item"

								@click = "onInput(option.value), setActive(false)"
							>{{getLabelFromOptionRow(option)}}</p>
						</div>

					</div>
				</transition>
			</div>
		</div>
	</input-wrap>
</template>

<script setup lang="ts">

import {OptionRow} from "../../../types";
import {computed, onMounted, ref} from "vue";
import InputWrap from "../input-wrap.vue";
import WidgetInputSelectCurrent from "./widget-input-select-current.vue";
import updateInputPosition from "../../../utils/update-input-position";
import WidgetInputSelectSearch from "./widget-input-select-search.vue";
import getLabelFromOptionRow from "../../../utils/get-label-from-option-row";

const props = defineProps<{
	label?: string,
	modelValue: any,
	disabled?: boolean,
	options: OptionRow[],
	placeholder?: string,
	errors: string[],
	hiddenValues?: OptionRow['value'][]
}>()

const refInputSelect = ref<HTMLElement>()
const inputSelectWrap = ref();
const active = ref(false);

function setActive(v = !active.value) {
	if (!v) filter.value = '';

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
	if (selected) return getLabelFromOptionRow(selected);

	if (props.disabled) return '';

	return props.placeholder || '';
})

function deactivate() {
	const elem = refInputSelect.value;
	if (!elem) return;

	let focusedOrHasFocused = elem.matches(':focus-within');
	if (focusedOrHasFocused) return;

	setActive(false);
}

onMounted(() => {
	refInputSelect.value?.addEventListener("keydown", e => {
		switch (e.code) {
			case "ArrowDown":
				e.preventDefault();
				updateInputPosition({options: filteredOptions.value, value: props.modelValue, onInput, duration: 1});
				break;
			case "ArrowUp":
				e.preventDefault();
				updateInputPosition({options: filteredOptions.value, value: props.modelValue, onInput, duration: -1});
				break;
		}
	})
})


const filter = ref('');
const filteredOptions = computed(() => {
	const _search = filter.value.toLowerCase();
	return props.options.filter(option =>
		!props.hiddenValues?.includes(option.value) &&
		getLabelFromOptionRow(option)?.toLowerCase?.().includes(_search)
	)
})

</script>

<style scoped>

.container__input-select-wrap {
	height: 35px;
	max-height: 35px;
}

.input-select {
	border: 1px solid #c8c8c8;
	border-radius: 4px;
	color: #1c1c1c;
	cursor: pointer;
	overflow: hidden;
	background-color: white;
	position: relative;
	outline: none;
}

.input-select:focus {
	border-color: #b2b2b2;
}

.input-select_error {
	border: 1px solid red;
}
.input-select_active {
	z-index: 1	;
}

.widget-input-select__list {
	position: relative;
	max-height: 240px;
	transition: max-height 0.3s;
	overflow: auto;
	background-color: white;

	display: grid;
	grid-template-rows: min-content minmax(0, 1fr);
}

.input-select_disabled {
	background-color: #e9e9e9;
	cursor: default;
}

.widget-select-options-item {
	padding: 8px 6px;
	margin: 0;

	color: #333333;
	font-size: 13px;
	transition: background-color 0.2s;
	border-radius: 2px;
}

.widget-select-options-item:hover {
	background-color: #f8f8f8;
}

.widget-select-options-item_active {
	background-color: #f4f4f4 !important;
	border-radius: 3px;
}
.widget-input-select__options-list {
	overflow: auto;
	padding:  0 1px;

}
.widget-input-select__options-list>:last-child{
	margin-bottom: 1px;
}
.fade-enter-active,
.fade-leave-active {
	transition: max-height 0.3s;
	overflow: hidden !important;
}

.fade-enter-from,
.fade-leave-to {
	max-height: 0;
}
</style>
