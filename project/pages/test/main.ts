import { createApp } from 'vue'
import App from './App.vue'
import {config} from "../../../plugin";

import country from "./widget-input-country.vue";
import accountType from "@/pages/test/widget-input-account-type.vue";
import InputCoord from "@/pages/test/input-coord.vue";
import InputFile from "@/pages/test/input-file.vue";

config({
	inputTypes: {
		country,
		"account-type": accountType,
		coord: InputCoord,
		file: InputFile
	},
	debug: true
})

createApp(App).mount('#app')
