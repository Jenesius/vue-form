import { createApp } from 'vue'
import App from './App.vue'
import {config} from "../../../src/index";

import country from "./widget-input-country.vue";
import accountType from "@/pages/test/widget-input-account-type.vue";
import InputCoord from "@/pages/test/input-coord.vue";
import InputFile from "@/pages/test/input-file.vue";
import InputTestDateLocal from "./input-test-date-local.vue";

config({
	inputTypes: {
		country,
		"account-type": accountType,
		coord: InputCoord,
		file: InputFile,
		'local-date': InputTestDateLocal
	},
	debug: true
})

createApp(App).mount('#app')
