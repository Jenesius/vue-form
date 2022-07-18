<template>
    <div class = "t">
		
		<input-hard name = "user"/>
		
		<p>Changed: {{state.changed}}</p>
		
        <button @click = "validate">validate</button>
        <button @click = "init">button</button>
        <button @click = "disable()">disable</button>
    </div>
</template>

<script setup lang = 'ts'>
    import InputField from "../../../plugin/widgets/input-field.vue";
    import {ref} from "vue";
	import {Form, useFormState} from "../../../plugin";
    import config from "../../../plugin/config/config";
    import InputAddress from "./../../components/v2/input-address.vue";
	import InputHard from "@/pages/index/input-hard.vue";

    const form = new Form();
	const {state} = useFormState(form);
	
	
    window.form = form;

	function init() {
		form.setValues({
			user: {
				name: 'Jenesius',
				age: 16
			}
		})
	}

	const disable = form.disable.bind(form);
    function validate() {
	    form.validate();
		console.log(form);
    }


    config({
        inputTypes: {
            address: InputAddress
        }
    })

</script>

<style>
	body{
		background-color: #e9f3ff;
	}

</style>
