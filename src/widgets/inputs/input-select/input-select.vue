<template>
	<field-wrap :label="label" :errors="errors">
		<div class="container-input-select">
			<div class="input-select"
				 :class="{
                    'input-select_disabled': disabled,
                    'input-select_error': errors.length,
            		'input-select_active': isActive
				}"
				 :tabindex="!disabled? 0 : null"

				 @focusout = "deactivate()"
				 @keyup.enter="setActive()"
				 @keydown.down.prevent = "handleMove(1)"
				 @keydown.up.prevent = "handleMove(-1)"
				 ref="refInputSelect"
			>
				<widget-input-select-current
					:label="label"
					:disabled = "disabled"
					:active="isActive"
					@click="setActive()"
				/>
				<transition name="height-resize">
					<div class = "input-select-option" v-if="isActive">
						<widget-input-select-search
							v-if = "options.length > store.select.countWithoutSearch"
							v-model = "filter"

							@focusin = "setActive(true)"
						/>
						<div class = "input-select-option-list">
							<p
								v-for = "option in filteredOptions"
								:key = "option.value"
								:class="{'input-select-option-list-item_active': modelValue === option.value}"
								class="input-select-option-list-item"
								:title = "option.value"

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
import {computed, nextTick, ref} from "vue";
import WidgetInputSelectCurrent from "./widget-input-select-current.vue";
import updateInputPosition from "../../../utils/update-input-position";
import WidgetInputSelectSearch from "./widget-input-select-search.vue";
import getLabelFromOptionRow from "../../../utils/get-label-from-option-row";
import FieldWrap from "../field-wrap.vue";
import debounce from "../../../utils/debounce";
import store from "../../../config/store";

const props = defineProps<{
	label?: string,
	modelValue: any,
	disabled?: boolean,
	options: OptionRow[],
	placeholder?: string,
	errors: string[],
	hiddenValues?: OptionRow['value'][]
}>()
const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

const refInputSelect = ref<HTMLElement>()

/**
 * @description true when user open the list of options.
 * */
const isActive = ref(false);
function setActive(v = !isActive.value) {
	if (props.disabled) return isActive.value = false;

	isActive.value = v;

	if (!v) filter.value = '';
	if (v) nextTick(scrollToActiveItem.bind(null,'auto'))
}
function onInput(v: any) {
	if (props.disabled) return;
	emit('update:modelValue', v)
}
/**
 * @description Метка отображаемая в поле.
 * */
const label = computed(() => {
	const selected = props.options.find(x => x.value === props.modelValue);
	if (selected) return getLabelFromOptionRow(selected);

	return props.disabled ? '' : props.placeholder || '';
})

function deactivate() {
	const elem = refInputSelect.value;
	if (!elem) return;

	// If Input inside InputSelect stay in focus
	if (elem.matches(':focus-within')) return;
	setActive(false);
}

/**
 * @description Функция для обработки перехода по списку, если пользователь нажимает клавиши вниз/вверх
 * */
function handleMove(duration: number) {
	updateInputPosition({options: filteredOptions.value, value: props.modelValue, onInput, duration});
	scrollToActiveItem('smooth')
}

/**
 * @description Для того, чтобы предотвратить повторный scroll - используем debounce.
 * */
const scrollToActiveItem = debounce(function (behavior: 'auto' | 'smooth' = 'auto') {
	if (!isActive.value) return;
	nextTick(() => {
		refInputSelect.value?.querySelector('.input-select-option-list-item_active')?.scrollIntoView({
			block: 'nearest',
			behavior
		})
	})
})


const filter = ref('');
const filteredOptions = computed(() => {
	const _search = filter.value.toLowerCase();
	return props.options.filter(option =>
		// Если объекта нет в скрытых значениях
		!props.hiddenValues?.includes(option.value) &&
		// Если поиск пуст или если label содержит search
		// *String* used to convert number or other types(not string) to string
		// Resolve https://github.com/Jenesius/vue-form/issues/107
		(_search.length === 0 || String(getLabelFromOptionRow(option))?.toLowerCase?.().includes(_search))
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

/**
Для options - чтобы в момент, когда active становился false, они не пропадали под другими поля для ввода.
Для блока целиком - чтобы в момент активации он был выше сверстников
*/
.input-select-option,
.input-select_active{
	z-index: 1;
}
/**
При активации - чтобы был выше предыдуще активированного блока.
*/
.input-select_active:has(.height-resize-enter-active) {
	z-index: 2;
}

</style>
