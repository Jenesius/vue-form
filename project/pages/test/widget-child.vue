<template>
	<p>{{state.state}}</p>
</template>

<script setup lang="ts">

import {useInputState} from "../../../plugin";

const state = useInputState('sun')

window.sun = state.input;


</script>

<style scoped>

</style>