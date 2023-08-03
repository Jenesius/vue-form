<template>
	<widget-field name="double" label = "Hello"/>
</template>

<script lang = "ts">
import {defineComponent} from "vue";

export default defineComponent({
	inheritAttrs: true
})
</script>
<script setup lang="ts">
import WidgetField from "./widget-field.vue";
import {getCurrentInstance, onMounted} from "vue";

const vm = getCurrentInstance();

onMounted(() => {

	console.group('widget-hello')
	console.log(vm?.attrs)
	console.log(vm?.props)
	console.groupEnd()
})

</script>

<style scoped>

</style>