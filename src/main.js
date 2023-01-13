import { createApp } from 'vue'
import App from './App.vue'
import VueExcelEditor from 'vue3-excel-editor'
import "/node_modules/primeflex/primeflex.css"
const app=createApp(App)
app.use(VueExcelEditor)

app.mount('#app')
