<template>
	<div class="widget-calendar">
		<div class="widget-calendar-container-select">
			<div class="widget-calendar-select widget-calendar-select-month">
				<input-field name="month" type="select" :options="state.months" placeholder="Month"/>
			</div>
			<div class="widget-calendar-select">
				<input-field name="year" type="select" :options="state.years" placeholder="Year"/>
			</div>
		</div>
		<div class="widget-calendar-container">
			<div class="widget-calendar-days-name">
                <span class="widget-calendar-days-name-elem"
					  v-for="(elem, index) in state.days"
					  :key="index"
				>{{ elem }}</span>
			</div>
			<div class="widget-calendar-main">
				<div
					v-for="(elem, index) in arrayCalendar"
					:key=index
					:title="elem.value"

					@click="onInput(elem.value)"
					:class="{
              'calendar-date_active': elem.value === modelValue,
              'calendar-date_current':elem.value === currentDate,
              'calendar-date_shadow': !isCurrentMonth(elem.value),
              [functionDateClass?.(elem.value) || '']: true
            }"
				>
					<span>{{ elem.title }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import {ComputedValue, Form, InputField} from "../../index";
import {computed} from "vue";

interface IProps {
	modelValue: any,
	functionDateClass?: any
}

interface ICalendarItem {
	title: string,
	value: string
}

const props = defineProps<IProps>()
const emits = defineEmits<{
	(event: 'update:modelValue', value: string): void
}>()

const today = new Date();
const form = new Form({parent: false})

form.setValues({
	month: today.getMonth(),
	year: today.getFullYear()
})

const month = ComputedValue<number>(form, 'month')
const year = ComputedValue<number>(form, 'year')

function isCurrentMonth(v: string) {
	const currentMonth = (new Date(v)).getMonth();
	return month.value === currentMonth
}

const enumMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const enumDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sub"];

const state = {
	months: enumMonths.map((title, index) => ({title, value: index})),
	days: enumDays,
	years: Array.from({length: 60}, (v, i) => ({
		value: 1990 + i,
		title: String(1990 + i)
	}))
}

const arrayCalendar = computed<ICalendarItem[]>(() => {
	const array: ICalendarItem[] = [];

	// @ts-ignore
	const countDays = new Date(year.value, Number(month.value) + 1, 0).getDate();

	//Номер певрого дня в недели текущей даты
	// @ts-ignore
	const firstDay = new Date(year.value, month.value, 1).getDay();

	//Дата с  котороый будет начинаться календарь
	// @ts-ignore
	const dateFirstCalendar = new Date(year.value, Number(month.value), 1 - firstDay);

	//Максимальное количество дней в календаре
	let maxDays = ((firstDay + countDays) > 35) ? 42 : 35;

	for (let i = 0; i < maxDays; i++) {

		array.push({
			title: dateFirstCalendar.getDate().toString(),
			value: dateFirstCalendar.toDateString(),
		})

		dateFirstCalendar.setDate(dateFirstCalendar.getDate() + 1);
	}

	return array
})

function onInput(value: string) {

	emits('update:modelValue', value);
}

const currentDate = (new Date).toLocaleDateString()

</script>

<style scoped>
.widget-calendar {
	width: 250px;
	border: var(--vf-input-border);
	padding: 10px;
	border-radius: var(--vf-input-border-radius);
	background-color: var(--vf-input-background);
}
.widget-calendar-container-select {
	display: flex;
	flex-direction: row;
}

.widget-calendar-select {
	width: 100px;
}

.widget-calendar-select-month {
	width: 120px;
	margin-right: 30px;
}

.widget-calendar-days-name {
	padding: 10px 0 0 0;
	display: flex;
	flex-direction: row;

	justify-content: space-between;

}

.widget-calendar-days-name > span {
	width: 33px;

	line-height: 20px;
	font-weight: bold;
	font-size: 14px;

	text-align: center;

}

.widget-calendar-days-name > span:last-child {
	margin-right: 0;
}

.widget-calendar-main {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;


}

.widget-calendar-main > div {
	cursor: pointer;
	position: relative;
	width: 14.2857%;

	text-align: right;

	margin-top: 10px;

	padding-right: 3px;

	font-size: 14px;
	line-height: 20px;
	transition: 0.2s;

}
.widget-calendar-main > div:hover {
	font-size: 13px;

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

	border: 0.5px solid #3E3E3E;
	border-radius: 2px;
}

.calendar-date_current:after {
	position: absolute;
	content: "";

	background: #CCCCCC;
	width: 20px;
	height: 18px;
	right: 0;
	z-index: -1;

	border: 0.5px solid #B3B3B3;
	border-radius: 2px;
}

.calendar-date_shadow {
	color: var(--vf-input-gray-light) !important;
}

.calendar-date_focus {
	background-color: rgba(20, 61, 141, 0.1);
}
</style>