import { createApp } from 'vue'
import App from './App.vue';
import {config, STORE} from "../../src/index";
import InputCountry from "../../project/pages/test/input-country.vue";

config({
	inputTypes: {
		country: InputCountry
	}
})

createApp(App).mount('#app')
