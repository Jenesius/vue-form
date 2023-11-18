import { createApp } from 'vue'
import App from './App.vue'
import {config} from "./../../../src/index";
import InputAddress from "./input-address.vue";

config({
	inputTypes: {
		address: InputAddress
	}
})

createApp(App).mount('#app')
