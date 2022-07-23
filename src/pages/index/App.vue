<template>
    <div>
		<input-field label = "test" name = "test" autofocus />
		<input-field type = "file" name = "file"/>
		<p>Changed: {{state.changed}}</p>
		
        <button @click = "form.validate.bind(form)">validate</button>
        <button @click = "init">button</button>
        <button @click = "disable()">disable</button>
    </div>
</template>

<script setup lang = 'ts'>
    import InputField from "../../../plugin/widgets/input-field.vue";
	import {Form, useFormState} from "../../../plugin";
	import {onMounted} from "vue";
	import grandObject from "../../../plugin/utils/grand-object";
	import bypassObject from "../../../plugin/utils/bypass-object";
	import replaceValues from "../../../plugin/utils/replace-values";

    const form = new Form();
	const {state} = useFormState(form);
	
     window.form = form;
	form.on(Form.EVENT_VALUE, v => {
		console.log("+",v);
	})
	function init() {
		form.setValues({
			user: {
				name: 'Jenesius',
				age: 16
			}
		})
	}
	onMounted(() => {
		
		const file = new File([], "test");

		

		const values = {file: Object.freeze(file)};

		console.log('Replace', replaceValues(values))
		
	})
	
	const disable = form.disable.bind(form)
</script>

<style>
	body{
		background-color: #e9f3ff;
	}
</style>
