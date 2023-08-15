<template>
	<div class="widget-calendar">
		<div class="widget-calendar-navigation">
			<input-field v-model="month" type="select" :options="arrayMonths" placeholder="Month"/>
			<input-field v-model="year" type="select" :options="arrayYears" placeholder="Year"/>
		</div>
		<div class="widget-calendar-board">
			<div class="widget-calendar-board-header">
                <span class="widget-calendar-board-label"
					  v-for="(elem) in arrayDays"
					  :key="elem.value"
				>{{ elem.label }}</span>
			</div>

			<div class="widget-calendar-board-body">
				<div class="widget-calendar-board-card"
					 v-for="(elem, index) in arrayCalendar"
					 :key=index
					 :title="elem.value"
					 @click="onInput(elem.value)"
					 :class="{
              'calendar-date_active': elem.value === parsedModelValue,
              'calendar-date_current':elem.value === today,
              'calendar-date_shadow': !isCurrentMonth(elem.value),
              [functionDateClass?.(elem.value) || '']: true
            }"
				>
					<span>{{ elem.label }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import {InputField} from "../../index";
import {computed, ref} from "vue";
import STORE from "../../config/store";
import {IOptionRowWithLabel} from "../../types";

interface IProps {
	modelValue: string, // Date correct parsed string
	functionDateClass?: any
}

const props = defineProps<IProps>()
const parsedModelValue = computed(() => {
	const date = new Date(props.modelValue);
	if (!isNaN(date.getTime()))
		return date.toDateString()
	return null;
})

const emits = defineEmits<{
	(event: 'update:modelValue', value: string): void
}>()

const currentDate = parsedModelValue.value ? new Date(props.modelValue) : new Date();
const month = ref(currentDate.getMonth())
const year = ref(currentDate.getFullYear())
const today = (new Date).toDateString()

const arrayMonths = STORE.date.months.map((label, index) => ({label, value: index}))
const arrayDays = STORE.date.daysWeek.map((label, index) => ({label, value: index}))
const arrayYears = Array.from({length: STORE.date.calendar.yearCount}, (v, i) => ({
	value: STORE.date.calendar.yearStart + i,
	title: String(STORE.date.calendar.yearStart + i)
}))

const arrayCalendar = computed<IOptionRowWithLabel[]>(() => {
	const array: IOptionRowWithLabel[] = [];
	/**
	 * Данная запись получает следующий месяц и устанавливает date в 0. А т.к. date измеряется в диапазон от 1 до 31, то
	 * 0 - это последний месяц предыдущего месяца. Т.к. мы установили следующий месяц мы получаем номер последнего
	 * дня текущего месяца.
	 * */
	const countDays = new Date(year.value, month.value + 1, 0).getDate();

	/**
	 * Значение от 0(воскресенье) до 6(суббота). Переменная хранит день недели(номер) первого дня текущего месяца.
	 * */
	const firstWeekDay = new Date(year.value, month.value, 1).getDay();

	/**
	 * Отнимая от 1 текущего месяца номер недели, мы получаем дату, с которой будет начинаться наш календарь. Далее
	 * мы будем добавлять к нему единицу.
	 * */
	const dateFirstCalendar = new Date(year.value, month.value, 1 - firstWeekDay);

	//Максимальное количество дней в календаре
	let maxDays = ((firstWeekDay + countDays) > 35) ? 42 : 35;

	for (let i = 0; i < maxDays; i++) {
		array.push({
			label: dateFirstCalendar.getDate().toString(),
			value: dateFirstCalendar.toDateString()
		})
		dateFirstCalendar.setDate(dateFirstCalendar.getDate() + 1);
	}
	return array
})

function onInput(value: string) {
	emits('update:modelValue', new Date(value).toUTCString());
}
function isCurrentMonth(v: string) {
	const currentMonth = (new Date(v)).getMonth();
	return month.value === currentMonth
}

</script>

<style scoped>
.widget-calendar {
	width: 250px;
	border: var(--vf-input-border);
	padding: 10px;
	border-radius: var(--vf-input-border-radius);
	background-color: var(--vf-input-background);
}

.widget-calendar-navigation {
	display: grid;
	grid-template-columns: 120px 100px;
	justify-content: space-between;
}

.widget-calendar-board-header {
	display: flex;
	justify-content: space-between;
}

.widget-calendar-board-label {
	font-weight: bold;
}

.widget-calendar-days-name > span:last-child {
	margin-right: 0;
}

.widget-calendar-board-body {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
}

.widget-calendar-board-card {
	cursor: pointer;
	position: relative;

	text-align: right;

	font-size: 14px;
	line-height: 20px;
	transition: var(--vf-input-transtion-fast);
	user-select: none;
}

.calendar-date_active {
	color: white;
}

.calendar-date_active:after {
	position: absolute;
	content: "";
	background-color: var(--vf-input-active) !important;
	width: 20px;
	height: 18px;
	right: 0;
	z-index: -1;
	border: 1px solid var(--vf-input-gray-dark);
	border-radius: 2px;
}

.calendar-date_current:after {
	position: absolute;
	content: "";

	background: var(--vf-input-gray-light);
	width: 20px;
	height: 18px;
	right: 0;
	z-index: -1;

	border: 1px solid var(--vf-input-gray-dark);
	border-radius: 2px;
}

.calendar-date_shadow {
	color: var(--vf-input-gray-light) !important;
}

</style>