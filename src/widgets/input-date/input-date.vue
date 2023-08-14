<template>
    <div>
        <!--INPUT-->
        <div class = "input-date">

            <div class = "test__input-wrap">
				<p>{{prettyMask}}</p>
				<input
					type = "text"
					:value = "pretty(insideValue)"
					@input = "handleInput($event.target.value)"
					@change = "handleChange($event.target.value)"
				>
			</div>
			<p>Inside: <b>{{insideValue}}</b></p>
            <div>ICON</div>
			{{defaultMask}}
        </div>
        <!--CALENDAR-->
    </div>
</template>

<script setup lang = "ts">
import {computed, ref, watch} from "vue";
import DateController from "../../../plugin/controllers/date-controller";

/**
 *
 */
const defaultMask = "dd/mm/yyyy";
/**
 *
 */

const props = defineProps<{
    modelValue: any
}>()
const insideValue = ref("")

const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

function pretty(s: unknown) {
    if (typeof s !== 'string') return ''
	if (DateController.isUTCDate(s)) return DateController.GetPrettyDateByMask(new Date(s), defaultMask)

	return s
}

function handleInput(v: string) {
	insideValue.value = v;
	if (!DateController.CheckFullerMask(v, defaultMask)) return;
	emitInput(v);
}
function handleChange(v: string) {
	emitInput(v)
}

function emitInput(v: string) {
	const r = DateController.ParseStringByMask(v, defaultMask);
	emit('update:modelValue', r?.toUTCString());
}


const prettyMask = computed(() => {
	if (!insideValue.value) return  defaultMask;
	if (DateController.isUTCDate(insideValue.value)) return '';

	console.log(DateController.Parse(insideValue.value, defaultMask))

	return insideValue.value + DateController.GetRestMask(insideValue.value, defaultMask);
})

// Контролируем валидацию маски.
watch(() => defaultMask, () => {
	DateController.ValidateMask(prettyMask.value)
}, {immediate: true})

watch(() => props.modelValue, v => insideValue.value = v, {immediate: true})

</script>

<style scoped>
	.test__input-wrap{
		position: relative;
		height: 40px;
		width: 200px;
	}
	.test__input-wrap>input {
		position: relative;
		height: 100%;
		width: 100%;
		background-color: transparent;
		padding: 0;
		margin: 0;
		border: 0;
		outline: 1px solid red;
		z-index: 1;
	}
	.test__input-wrap>p{
		display: flex;
		align-items: center;
		position: absolute;
		z-index: 0;
		top: 0;
		height: 100%;
		left: 0;
		margin: 0;
		padding: 0;
		user-select: none;
		font-size: var(--vf-input-font-size);
		color: gray;

	}
	input, textarea, select { font-family:inherit; }
</style>