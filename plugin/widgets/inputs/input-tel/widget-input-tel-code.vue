<template>
    <div class = "container-input-tel-code vf-grid-center">
        <img class = "input-tel-code" alt = "current tel code" :src = "`https://flagcdn.com/${countryCode}.svg`" width="24"
            v-if = "countryCode"
        />
        <div class = "container-input-tel-code-default vf-grid-center" v-else>
			<span>&#63;</span>
        </div>
    </div>
</template>

<script setup lang = "ts">
    defineProps<{
		countryCode?: string
    }>()
</script>

<style scoped>
    .container-input-tel-code{
        padding: 0 10px;
    }
    .input-tel-code{
        user-select: none;
        border: 1px solid var(--vf-input-white-light);
    }
	.container-input-tel-code-default{
		width:  24px;
		height: 16px;

		background-color: var(--vf-input-white-dark);
	}
	.container-input-tel-code-default>span{
		color: var(--vf-input-black-light);
		font-size: 11px;
		line-height: 13px;
	}
</style>