import { createApp } from 'vue'
import App from './App.vue'
import VueExcelEditor from 'vue3-excel-editor'
import PrimeVue from 'primevue/config';
import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Toaster from '@meforma/vue-toaster';

const app=createApp(App)
app.use(VueExcelEditor)
   .use(PrimeVue)
   .use(Toaster)

app.mount('#app')
