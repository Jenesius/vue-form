import { createApp } from 'vue'
import App from './App.vue'
import config from "../../../plugin/config/config";
import InputAddress from "@/components/input-address.vue";
import InputUser from "@/components/input-user.vue";


createApp(App).mount('#app')
config({
	inputTypes: {
		address: InputAddress,
		user: InputUser
	}
})