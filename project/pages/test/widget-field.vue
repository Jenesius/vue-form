<template>
	<component
		:is = "item"
		v-bind = "$attrs"
		:label = "parsedLabel"
	/>
</template>

<script setup lang = "ts">

import WidgetChild from "@/pages/test/widget-child.vue";
import WidgetDoubleChild from "@/pages/test/widget-double-child.vue";
import WidgetHello from "@/pages/test/widget-hello.vue";
import {computed, onMounted, getCurrentInstance, onBeforeMount} from "vue";

const props = defineProps<{
	name: keyof typeof store,
	label?: string
}>()

const store = {
	child: WidgetChild,
	double: WidgetDoubleChild,
	hello: WidgetHello
}
const item = computed(() => store[props.name] || WidgetChild)

const vm = getCurrentInstance()

function isString(a:unknown): a is string {
	return typeof a === 'string'
}
onBeforeMount(() => {

	console.group('widget-field')
	console.log(vm?.attrs)
	console.log(vm?.props)
	console.groupEnd()
})
const parsedLabel = computed(() => {
	if (!vm?.attrs) return 'No attr';
	const label = vm.attrs.label || vm.props.label;

	if (label === undefined) return 'Value from parent'

	if (!isString(label)) return 'wrong type of label';
	if (label.length < 3) return 'To short';
	return label;
})



</script>

<style scoped>

</style>