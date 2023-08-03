<template>
	<div class="container-input-file">
		<p>UPLOADING FILE</p>
		<input class="widget-input-file" type="file" @change="onInput"/>
		{{modelValue}}
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: any
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(event: 'update:modelValue', file: any):void
}>();
function onInput(event: any) {
	const file = event.target.files[0];
	console.log(file)
	emit('update:modelValue', Object.freeze(file))
}

</script>

<style scoped>
.container-input-file {
	display: flex;
	background-color: red;
}

.button-upload-file {
	display: grid;
	place-content: center;
	border: 2px dashed gray;
	height: 35px;
	width: 100px;
	position: relative;
	cursor: pointer;
	border-radius: 4px;
}

.widget-input-file {
	opacity: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
	cursor: pointer;
}

.widget-input-file::-webkit-file-upload-button {
	display: none;
	color: gray;
}

.button-upload-file__label {
	font-size: 14px;
}

.button-upload-file_wait {
	cursor: default;
	border-color: blue;
}

.button-upload-file_error {
	border-color: red;
}

.button-upload-file_wait:after {
	content: "";
	position: absolute;
	z-index: 1;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
}
</style>