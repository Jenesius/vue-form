<template>
	<field-wrap :label="label" :errors="errors">
		<div class="container-input-select" ref="inputSelectWrap">
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
					:label="title"
					:active="active"
					@click="setActive()"
					:disabled = "disabled"
				/>
				<transition name="fade">
					<div class = "input-select-option" v-if="active">
						<widget-input-select-search
							v-if = "options.length > 6"
							v-model = "filter"

							@focusin = "setActive(true)"
							@focusout = "deactivate()"
						/>

						<div class = "input-select-option-list">
							<p
								v-for = "option in filteredOptions"
								:key = "option.value"
								:class="{'input-select-option-list-item_active': modelValue === option.value}"
								class="input-select-option-list-item"

								@click = "onInput(option.value), setActive(false)"
							>{{getLabelFromOptionRow(option)}}</p>
						</div>

					</div>
				</transition>
			</div>
		</div>
	</field-wrap>
</template>

<script setup lang="ts">
import {OptionRow} from "../../../types";
import {computed, onMounted, ref} from "vue";
import WidgetInputSelectCurrent from "./widget-input-select-current.vue";
import updateInputPosition from "../../../utils/update-input-position";
import WidgetInputSelectSearch from "./widget-input-select-search.vue";
import getLabelFromOptionRow from "../../../utils/get-label-from-option-row";
import FieldWrap from "../field-wrap.vue";

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

.container-input-select {
	height: var(--vf-input-height);
	max-height: var(--vf-input-height);
}

.input-select {
	border: var(--vf-input-border);
	border-radius: var(--vf-input-border-radius);
	color: var(--vf-input-color);
	cursor: pointer;
	overflow: hidden;
	background-color: white;
	position: relative;
	outline: none;
}

.input-select:focus {
	border: var(--vf-input-border-focus);
}
.input-select_error {
	border: var(--vf-input-border-error);
}

.input-select_disabled {
	background-color: var(--vf-input-background-disabled);
	cursor: default;
}
.input-select-option {
	position: relative;
	max-height: var(--vf-input-select-option-height);
	transition: max-height 0.3s;
	overflow: auto;
	background-color: var(--vf-input-background);

	display: grid;
	grid-template-rows: min-content minmax(0, 1fr);
	z-index: 2;
}

.input-select-option-list-item {
	padding: 8px 6px;
	margin: 0;

	color: var(--vf-input-label-color);
	font-size: var(--vf-input-font-size);
	transition: background-color 0.2s;
	border-radius: 2px;
}

.input-select-option-list-item:hover {
	background-color: var(--vf-input-white-light);
}

.input-select-option-list-item_active {
	background-color: #f4f4f4;
	border-radius: 3px;
}
.input-select-option-list {
	overflow: auto;
	padding:  0 1px;
}
.input-select-option-list>:last-child{
	margin-bottom: 1px;
}

.fade-enter-active,
.fade-leave-active {
	transition: max-height var(--vf-input-transtion-medium);
	overflow: hidden !important;
	z-index: 3;
}

.fade-enter-from,
.fade-leave-to {
	max-height: 0;
	z-index: 1;
}
</style>
