<template>
	<div class = "widget-number-step">
		<div class = "step-container step_up" @click = "emits('step', true)">
			<i class = "vf-arrow vf-arrow_up"></i>
		</div>
		<div class = "step-container step_down" @click = "emits('step', false)">
			<i class = "vf-arrow vf-arrow_down"></i>
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
		border-radius: var(--vf-input-border-radius);
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
		border-color: var(--vf-input-active);
	}
</style>