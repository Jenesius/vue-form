<template>
	<div>
		<input-field
			type="file"
			name="DescriptorId"
			:entity="'123'"
			required
		/>
	</div>
</template>

<script setup>
import {InputField, Form} from "../../../src/index";

const form = new Form({ parent: false, name: 'test' });
</script>

<style scoped>

</style>