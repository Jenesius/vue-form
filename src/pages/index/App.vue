<template>
    <div>
		<input-field label = "test" name = "test" autofocus />

		<p>Changed: {{state.changed}}</p>
		
        <button @click = "form.validate.bind(form)">validate</button>
        <button @click = "init">button</button>
        <button @click = "disable()">disable</button>
    </div>
</template>

<script setup lang = 'ts'>
    import InputField from "../../../plugin/widgets/input-field.vue";
	import {Form, useFormState} from "../../../plugin";

    const form = new Form();
	const {state} = useFormState(form);
	
    // window.form = form;

	function init() {
		form.setValues({
			user: {
				name: 'Jenesius',
				age: 16
			}
		})
	}
	const disable = form.disable.bind(form)
</script>

<style>
	body{
		background-color: #e9f3ff;
	}
</style>
