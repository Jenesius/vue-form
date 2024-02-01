<template>
	<field-wrap :label="label" :errors="errors">
		<div class="container-input-date" :class = "{'container-input-date_disabled': disabled, 'container-input-date_error': errors.length}">

			<div class="wrap-input-date">
				<p class="input-date-mask">{{(insideValue?.length || !placeholder) ? prettyMask : (placeholder) }}</p>
				<input
					class="vf-input_clean input-date"
					type="text"
					:value="prettyValue"
					@input="handleInput($event.target.value)"
					@change="handleEndInput()"
					:disabled="disabled"
				>
			</div>
			<div class="input-date-icon vf-grid-center"
				 @click="changeCalendarStatus(!calendarStatus)"
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
								 @update:modelValue="handleCalendarInput"
				/>
			</div>
		</transition>
	</field-wrap>
</template>

<script setup lang="ts">
import {computed, nextTick, ref, watch} from "vue";
import DateController from "../../../controllers/date-controller";
import WidgetCalendar from "./widget-calendar.vue";
import clickOutside from "../../../utils/click-outside";
import IconCalendar from "../../icons/icon-calendar.vue";
import FieldWrap from "../field-wrap.vue";
import {ValidationError} from "../../../types";
import STORE from "../../../config/store";
import {IInputDateHandlerFrom, IInputDateHandlerTo} from "../../../types/input-date-types";

const props = withDefaults(defineProps<{
	modelValue: any,
	label?: string,
	errors: ValidationError[],
	mask?: string,
	placeholder?: string,
	disabled: boolean,
	handlers?: [IInputDateHandlerFrom, IInputDateHandlerTo]
}>(), {
	mask: () => STORE.dateMask,
})
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()


const insideValue = ref("")
const refCalendar = ref();
const calendarStatus = ref(false);
let offCalendar: any;


function changeCalendarStatus(status: boolean) {
	calendarStatus.value = status;
	nextTick(() => {
		if (status) offCalendar = clickOutside(refCalendar.value, changeCalendarStatus.bind(null, false))
		else offCalendar?.()
	})
}
/**
 * @description Принимает дату в формате Date
 * */
function handleCalendarInput(calendarStringDate: Date) {
	emitInput(DateController.GetPrettyDate(calendarStringDate, props.mask))
}

/**
 * @description Функция для обработки конца ввода(Когда изменения поля завершилось).
 */
function handleEndInput() {
	const value = insideValue.value;
	emitInput(DateController.CheckFullerMask(value, props.mask) ? value : '')
}
function handleInput(value: string) {
	insideValue.value = value;
	if (DateController.CheckFullerMask(value, props.mask)) emitInput(value);
}


function emitInput(value: string) {
	if (props.disabled) return false;
	if (props.handlers) value = props.handlers[1](value);
	emit('update:modelValue', value || null);

	// Cleaning insideValue if date is NULL. Also, this step clean input value.
	if (!value) insideValue.value = ""
}



function pretty(s: unknown): string {
	if (typeof s !== 'string') return ''

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
watch(() => props.modelValue, v => {
	if (props.handlers) {
		const tmp = props.handlers[0](v);
		if (tmp) v = DateController.GetPrettyDate(tmp, props.mask);
	}
	insideValue.value = v
}, {immediate: true})

</script>

<style scoped>

.container-input-date {
	display: flex;
	height: var(--vf-input-height);
	border-radius: var(--vf-input-border-radius);
	border: var(--vf-input-border);
	background-color: var(--vf-input-background);
}
.container-input-date_disabled {
	background-color: var(--vf-input-background-disabled);
}
.container-input-date_error {
	border: var(--vf-input-border-error);
}
.container-input-date:focus-within {
	border: var(--vf-input-border-focus)
}

.input-date {
	padding-inline: 4px;
	color: var(--vf-input-color);
	font-size: var(--vf-input-font-size);
	position: relative;
	/*z-index: 1;*/
}

.wrap-input-date {
	display: grid;
	position: relative;
	flex-grow: 1;
}

.input-date-mask {
	display: flex;
	align-items: center;
	height: 100%;

	position: absolute;
	inset-inline-start: 0;
	inset-block-start: 0;
	z-index: 0;
	margin: 0;

	padding-inline: 4px;
	user-select: none;
	font-size: var(--vf-input-font-size);
	color: var(--vf-input-gray-dark);
}

.input-date-icon {
	cursor: pointer;
	stroke: var(--vf-input-gray-deep);
	transition: var(--vf-input-transtion-fast);
	padding-inline: 6px;
}

.input-date-icon_active {
	stroke: var(--vf-input-active);
}
.container-input-date_disabled .input-date-icon{
	stroke: var(--vf-input-gray-light);
}

.input-date-calendar {
	position: absolute;
	z-index: 2;
	inset-inline-end: 0;
	inset-block-start: 10px;
}
.container-date-calendar {
	position: relative;
	z-index: 1;
}
</style>