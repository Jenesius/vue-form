<template>
	<field-wrap :label="label" :errors="errors">
		<div class="container-input-date">

			<div class="wrap-input-date">
				<p class="input-date-mask">{{(insideValue?.length || !placeholder) ? prettyMask : (placeholder) }}</p>
				<input
					class="vf-input_clean input-date"
					type="text"
					:value="prettyValue"
					@input="handleInput($event.target.value)"
					@change="handleChange($event.target.value)"
				>
			</div>
			<div class="input-date-icon"
				 @click.stop="changeCalendarStatus(!calendarStatus)"
				 :class="{
					'input-date-icon_active': calendarStatus
				}"
			>
				<icon-calendar/>
			</div>
		</div>
		<!--CALENDAR-->
		<transition name="slide">
			<div ref="refCalendar" v-if="calendarStatus" class = "container-date-calendar">
				<widget-calendar class="input-date-calendar"
								 :model-value="modelValue"
								 @update:modelValue="handleCalendarInput" />
			</div>
		</transition>
	</field-wrap>
</template>

<script setup lang="ts">
import {computed, nextTick, ref, watch} from "vue";
import DateController from "../../controllers/date-controller";
import WidgetCalendar from "./widget-calendar.vue";
import clickOutside from "../../utils/click-outside";
import IconCalendar from "../icons/icon-calendar.vue";
import FieldWrap from "../field-wrap.vue";
import {ValidationError} from "../../types";
import STORE, {IStore} from "../../config/store";

const props = withDefaults(defineProps<{
	modelValue: any,
	label?: string,
	errors: ValidationError[],
	mask?: string,
	placeholder?: string,
}>(), {
	mask: () => STORE.date.dateMask,
})
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()


const insideValue = ref("")
const refCalendar = ref();
const calendarStatus = ref(false);

/**
 * @description Принимает дату в формате DateString (new Date().toDateString()).
 * */
function handleCalendarInput(calendarStringData: string) {
	emitInput(new Date(calendarStringData))
}

let offCalendar: any;
function changeCalendarStatus(status: boolean) {
	calendarStatus.value = status;
	nextTick(() => {
		if (status) offCalendar = clickOutside(refCalendar.value, changeCalendarStatus.bind(null, false))
		else offCalendar?.()
	})
}


function handleInput(v: string) {
	insideValue.value = v;
	if (!DateController.CheckFullerMask(v, props.mask)) return;
	nextTick(() => handleUserHandInput(prettyValue.value))
}
function handleChange(v: string) {
	handleUserHandInput(v);
}

/**
 * @description Используется только для ручного ввода даты, т.к. далее использует конвертацию в дату по маске, а не
 * объект Date
 * */
function handleUserHandInput(input: string) {
	const date = DateController.ConvertToDate(input, props.mask);
	emitInput(date);
}
function emitInput(date: Date | null) {
	emit('update:modelValue', date ? date.toISOString() : date);
}



function pretty(s: unknown): string {
	if (typeof s !== 'string') return ''

	/**
	 * Является ли дата конечной. В таком случае полученная строка уже не является исходником маски, а может иметь любой
	 * вид. Для этого используется функция GetPrettyDate.
	 * */
	if (DateController.isUTCDate(s)) return DateController.GetPrettyDate(new Date(s), props.mask)

	return DateController.SplitStringByMask(s, props.mask)
	.map(a => a.input || (a.skipped ? a.part : ''))
	.join('')
}

const prettyValue = computed(() => pretty(insideValue.value))
const prettyMask = computed(() => {
	if (!insideValue.value) return props.mask;
	return prettyValue.value + DateController.GetRestMask(prettyValue.value, props.mask);
})


// Контролируем валидацию маски.
watch(() => props.mask, () => DateController.ValidateMask(prettyMask.value), {immediate: true})
// Контролируем внутренне значение поля.
watch(() => props.modelValue, v => insideValue.value = v, {immediate: true})

</script>

<style scoped>

.container-input-date {
	display: flex;
	height: var(--vf-input-height);
	border-radius: var(--vf-input-border-radius);
	border: var(--vf-input-border);
	background-color: var(--vf-input-background);
}

.container-input-date:focus-within {
	border-color: var(--vf-input-gray-dark);
}

.input-date {
	padding: 0 4px;
	color: var(--vf-input-color);
	font-size: var(--vf-input-font-size);
	background-color: transparent;
	outline: none;
	position: relative;
	z-index: 1;
}

.wrap-input-date {
	display: grid;
	position: relative;
	flex-grow: 1;
}

.input-date-mask {
	display: flex;
	align-items: center;
	position: absolute;
	z-index: 0;
	top: 0;
	height: 100%;
	left: 0;
	margin: 0;
	padding: 0 4px;
	user-select: none;
	font-size: var(--vf-input-font-size);
	color: var(--vf-input-gray-dark);
}

.input-date-icon {
	cursor: pointer;
	display: grid;
	place-content: center;
	stroke: var(--vf-input-gray-dark);
	transition: var(--vf-input-transtion-fast);
	padding: 0 6px;
}

.input-date-icon_active {
	stroke: var(--vf-input-active);
}

.input-date-calendar {
	position: absolute;
	right: 0;
	margin-top: 10px;
	z-index: 2;
}
.container-date-calendar {
	position: relative;
}
</style>