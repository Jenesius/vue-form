import { createApp } from 'vue'
import App from './App.vue';
import {config} from "../../plugin";

config({
    debug: true
})

createApp(App).mount('#app')
