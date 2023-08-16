<template>
	<div class="container-input-select-current">
		<p class="container-input-select-current-label">{{ label }}</p>

		<i class="vf-arrow vf-arrow_down"
		   v-if="!disabled"
		   :class="{'vf-arrow_active': active}"
		></i>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	disabled: boolean,
	active: boolean,
	label: string
}>()

</script>

<style scoped>
.container-input-select-current {
	height: var(--vf-input-height);
	display: flex;
	align-items: center;
}

.vf-arrow_active {
	transform: rotate(225deg);
}

.container-input-select-current-label {
	padding: 0 6px;
	color: var(--vf-input-color);
	font-size: var(--vf-input-font-size);

	flex-grow: 1;
}

.container-input-select-current > .vf-arrow {
	margin: 0 10px 0 0;
}
</style>
