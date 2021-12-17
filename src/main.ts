import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.css'
// 自定义指令
import initDirective from '@/utils/directive'

//全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 按需引入
import registerApp from './global/index'
const app = createApp(App)
initDirective(app)
registerApp(app)
// app.use(ElementPlus)
app.use(store).use(router).mount('#app')
