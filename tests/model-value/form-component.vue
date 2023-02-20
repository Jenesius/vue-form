<template>
	<div>
		<input-field name = "city"/>
		<input-field name = "country"/>
		<input-field :model-value = "test"/>
		<input-field :model-value = "city" name="city"/>
		<input-field v-model = "country" name="country"/>

	</div>
</template>

<script>
import {Form, InputField} from "../../plugin";
import {ref} from "vue";

export default {
	data: () => ({
		test: "",
		city: "",
		country: "",

	}),

	setup() {
		const form = new Form({name: 'test'})
		return {
			form
		}
	},
	components: {InputField}
}

</script>

<style scoped>

</style>