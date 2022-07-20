import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementIcons from '@element-plus/icons-vue'

let app = createApp(App);
for (const [name, comp] of Object.entries(ElementIcons)) {
    app.component(name, comp)
}
app.use(ElementPlus);
app.mount('#app');
