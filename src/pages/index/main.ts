import { createApp } from 'vue'
import App from './App.vue'
import config from "../../../plugin/config/config";
import InputAddress from "@/components/input-address.vue";
import InputUser from "@/components/input-user.vue";
import InputFile from "@/components/input-file.vue";
import InputInside from "./inside-input.vue";

config({
	inputTypes: {
		address: InputAddress,
		user: InputUser,
		file: InputFile,
		test: InputFile,
		inside: InputInside
	}
})

createApp(App).mount('#app')
