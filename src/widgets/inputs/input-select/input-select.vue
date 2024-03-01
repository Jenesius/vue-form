<template>
	<field-wrap :label="label" :errors="errors">
		<div class="container-input-select">
			<div class="input-select"
				 :class="{
                    'vf-input-select_disabled': disabled,
                    'vf-input-select_error': errors.length,
            		'vf-input-select_active': isActive,
            		'vf-input-select_multi': !!multiple
				}"
				 :tabindex="!disabled ? 0 : 'none' "

				 @focusout = "deactivate()"
				 @keyup.enter="setActive()"
				 @keydown.down.prevent = "handleArrowKeyMove"
				 @keydown.up.prevent = "handleArrowKeyMove"
				 @keydown.space.prevent = "handleSpace"
				 ref="refInputSelect"
			>
				<widget-input-select-current
					:label="inputTitle"
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
								:class="{'input-select-option-list-item_active': isActiveItem(option.value), 'vf-input-select-row_current': valueOfActiveItem === option.value}"
								class="input-select-option-list-item"
								:title = "option.value"

								@click = "handleSelect(option.value)"
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
import WidgetInputSelectSearch from "./widget-input-select-search.vue";
import getLabelFromOptionRow from "../../../utils/get-label-from-option-row";
import FieldWrap from "../field-wrap.vue";
import debounce from "../../../utils/debounce";
import store from "../../../config/store";
import toggleValueFromArray from "../../../utils/toggle-value-from-array";
import getOptionRowByDuration from "../../../utils/get-option-row-by-duration";

const props = defineProps<{
	label?: string,
	modelValue: any,
	disabled?: boolean,
	options: OptionRow[],
	placeholder?: string,
	errors: string[],
	hiddenValues?: OptionRow['value'][],
	multiple?: boolean,
	/**
	 * @description Максимальное возможное число выборки элементов в случае, когда установлен multiple атрибут.
	 */
	limit?: number | string
}>()
const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void
}>()

const refInputSelect = ref<HTMLElement>()

// Приведённый в числовой вид предел.
const parsedLimit =computed(() => {
	return typeof props.limit === 'number' ? props.limit : (typeof props.limit === 'string' ? Number.parseInt(props.limit, 10) : undefined);
});

/**
 * @description true when user open the list of options.
 * */
const isActive = ref(false);
/**
 * @description Значение активного элемента(не выбранного) на котором находится пользователь при проходе по списку с Ctrl.
 * элемента не установлено.
 */
const valueOfActiveItem = ref<unknown>(undefined);
/**
 * @description Метка отображаемая в поле. В случае с одиночной выборкой отображается либо текущий элемент, либо placeholder.
 * В случае множественной выборки (multiple) - отображается первый выбранный элемент. Если элементов больше одного,
 * то отображается ещё + N, где N - количество выбранных элементов - 1
 * */
const inputTitle = computed(() => {
	const value = props.multiple ? props.modelValue?.[0] : props.modelValue;
	const selected = props.options.find(x => x.value === value);
	if (selected) {
		const resultLabel = getLabelFromOptionRow(selected);
		if (!props.multiple) return resultLabel;

		return resultLabel + (props.modelValue.length > 1 ? ` + ${props.modelValue.length - 1}` : '')
	}
	return props.disabled ? '' : props.placeholder || '';
})

/**
 * @description Текущий фильтр введённый пользователем.
 */
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

function setActive(v = !isActive.value) {
	if (props.disabled) return isActive.value = false;

	isActive.value = v;

	if (!v) filter.value = '';
	if (v) {
		nextTick(scrollToActiveItem.bind(null,'auto'))
		valueOfActiveItem.value = getCurrentLastValue()
	}
}

function deactivate() {
	const elem = refInputSelect.value;
	if (!elem) return;

	// If Input inside InputSelect stay in focus
	if (elem.matches(':focus-within')) return;
	setActive(false);
}

function getCurrentLastValue() {
	return props.multiple ? Array.isArray(props.modelValue) ? props.modelValue[props.modelValue.length - 1] : undefined : props.modelValue
}
/**
 * @description Для того, чтобы предотвратить повторный scroll - используем debounce.
 * */
const scrollToActiveItem = debounce(function (behavior: 'auto' | 'smooth' = 'auto') {
	if (!isActive.value) return;
	nextTick(() => {
		refInputSelect.value?.querySelector('.vf-input-select-row_current')?.scrollIntoView({
			block: 'nearest',
			behavior
		})
	})
})

function handleSpace() {
	if (!props.multiple) return;
	input(toggleMultipleValue(props.modelValue,valueOfActiveItem.value))
}

/**
 * @description Карта переходов.
 * undefined - предыдущее значение не определено
 * 0 - не выбрано, 1- выбрано
 * 1, 0, 1, 1 - означает, что при переходе с активного на неактивный (1 -> 0), у нас должно получится активный и активный(1, 1)

const MAP_SHIFT_TRANSITION = [
	undefined, 0, undefined, 1, // 0
	1, 0, 1, 1,					// 1
	1, 0, 0, 1,					// 2
	0, 0, 1, 1,					// 3
	0, 1, 0, 0,					// 4
]
 * @description Функция для обработки перехода по списку, если пользователь нажимает клавиши вниз/вверх.
 * В режиме multi с зажатой Shift зависит от текущего положения пользователя.
 * */
function handleArrowKeyMove(event: KeyboardEvent) {
	const duration = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
	// Запоминаем элемент с которого мы начали при инициировании прохода. Это требуется в случае с multiple & shiftKey
	const savedPrevActiveItem = valueOfActiveItem.value;
	valueOfActiveItem.value = getOptionRowByDuration(filteredOptions.value, valueOfActiveItem.value, duration).value;
	if (!props.multiple) input(valueOfActiveItem.value);
	else {
		/**
		 * В данном случае работа идёт с multiple select.
		 * Если есть shift - выборка является срезом(добавляем элемент)
		 * Иначе если зажат ctrl - ничего не делаем(перемещаемся, изменение position уже сделано выше) Данная проверка
		 * уже сделана на первом if.
		 * Иначе(нет ни Shift, ни Ctrl) устанавливаем элемент
		 */
		let result: unknown[] = Array.isArray(props.modelValue) ? props.modelValue : [];
		if (event.shiftKey) {
			const movement = [result.length ? isActiveItem(savedPrevActiveItem) : undefined , isActiveItem(valueOfActiveItem.value)]
			// 1-> 1. Для более краткой записи используется
			const isPositiveMovement = (movement[0] && movement[1])

			if (!isPositiveMovement) result = toggleMultipleValue(result, valueOfActiveItem.value)
			if ((movement[0] === false && movement[1] === false) || isPositiveMovement) result = toggleMultipleValue(result, savedPrevActiveItem)
			input(result);
		}
		else if (!event.ctrlKey) input([valueOfActiveItem.value]);
	}
	scrollToActiveItem('smooth')
}

/**
 * @description Wrapper over data input.
 */
function handleSelect(value: any) {
	if (!props.disabled) input(props.multiple ? toggleMultipleValue(props.modelValue, value) : value)
	if (!props.multiple) setActive(false)
}

/**
 * @description Абстракция нам метод переключения элемента из выборки. Используется как обёртка на этой функцией для того,
 * чтобы каждый раз не проверять массив и подключать предел.
 */
function toggleMultipleValue(array: unknown[], value: unknown) {
	return toggleValueFromArray(Array.isArray(array) ? array : [], value, parsedLimit.value)
}

/**
 * @description Конечная точка ввода данных. Используется для проверки типа.
 * @param value
 */
function input(value: unknown) {
	if (props.multiple && !(Array.isArray(value) || value === null || value === undefined))
		return console.warn('An attempt to set a value for input-select(multiple: true) failed. The data is not an array, null or undefined.', value);
	emit('update:modelValue', value)
}

/**
 * @description Является ли данный элемент активным(modelValue) содержит значение
 */
function isActiveItem(value: any) {
	return props.multiple ? (Array.isArray(props.modelValue) ? props.modelValue : []).includes(value) : props.modelValue === value
}

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
.vf-input-select_error {
	border: var(--vf-input-border-error);
}

.vf-input-select_disabled {
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
	color: var(--vf-input-active);
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
.vf-input-select_active{
	z-index: 1;
}
/**
При активации - чтобы был выше предыдуще активированного блока.
*/
.vf-input-select_active:has(.height-resize-enter-active) {
	z-index: 2;
}

.vf-input-select_multi .vf-input-select-row_current {
	border: 1px solid var(--vf-input-gray-light) !important;
}
</style>
