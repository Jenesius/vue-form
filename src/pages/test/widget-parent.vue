<template>
	<component :is = "c"/>
</template>

<script setup lang = "ts">
defineProps<{
	c: any
}>()
</script>

<style scoped>

</style>