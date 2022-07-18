<template>
	<div class = "widget-number-step">
		<div class = "step-container step_up" @click = "emits('step', true)">
			<i class = "arrow up"></i>
		</div>
		<div class = "step-container step_down" @click = "emits('step', false)">
			<i class = "arrow down"></i>
		</div>
	</div>
</template>

<script setup lang = "ts">
	const emits = defineEmits<{
		(name: 'step', a: boolean): void
	}>()
</script>

<style scoped>
	.widget-number-step{
		display: grid;
		place-content: center;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr;
		gap: 1px;
		cursor: pointer;
		border-radius: 4px;
		transition: background-color 0.2s;
	}
	.widget-number-step:active{
		background-color: #fbfbfb;
	}
	.widget-number-step>div{
		display: grid;
		place-content: center;
	}
	.step_up{
		padding: 8px 0 0 0;
	}
	.step_down{
		padding: 0 0 8px 0;
	}
	.step-container:active>.arrow{
		border-color: #4e74ff;
	}
</style>