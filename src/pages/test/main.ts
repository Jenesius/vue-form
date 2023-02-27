import { createApp } from 'vue'
import App from './App.vue'
import {config} from "../../../plugin";

import country from "./widget-input-country.vue";
import accountType from "@/pages/test/widget-input-account-type.vue";

config({
	inputTypes: {
		country,
		"account-type": accountType
	}
})

createApp(App).mount('#app')
