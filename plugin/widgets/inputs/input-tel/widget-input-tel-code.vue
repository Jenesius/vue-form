<template>
    <div class = "container-code">
        <img class = "tel-code" alt = "current tel code" :src = "`https://flagcdn.com/${countryCode}.svg`" width="24"
            v-if = "countryCode"
        />
        <div class = "container-default-code tel-code" v-else>
            <span>?</span>
        </div>
    </div>
</template>

<script setup lang = "ts">
    defineProps<{
		countryCode?: string
    }>()
</script>

<style scoped>
    .container-code{
        padding: 0 10px;
        display: grid;
        place-content: center;
    }
    .container-default-code{
        width:  24px;
        height: 16px;
		display: grid;

        background-color: #dadada;
        text-align: center;
    }

    .tel-code{
        user-select: none;
        border: 1px solid #f6f6f6;
    }
	.container-default-code>span{
		color: gray;
		font-size: 11px;
		line-height: 13px;
	}
</style>