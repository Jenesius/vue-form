<template>
	<widget-parent :c="WidgetMother" label = "Hi From Grandmother"/>
</template>

<script setup>
import WidgetParent from "@/pages/test/App.vue";
import WidgetMother from "@/pages/test/widget-mother.vue";
</script>

<style scoped>

</style>