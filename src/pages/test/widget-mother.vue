<template>
	<widget-parent :c="WidgetDaughter" label = "Test"/>
</template>

<script setup>
import WidgetParent from "@/pages/test/App.vue";
import WidgetDaughter from "@/pages/test/widget-daughter.vue";


</script>

<style scoped>

</style>