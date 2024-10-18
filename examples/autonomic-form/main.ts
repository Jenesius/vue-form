import { createApp } from 'vue'
import App from './App.vue';
import {config} from "./../../src/index";

config({
	debug: true
})

createApp(App).mount('#app')
