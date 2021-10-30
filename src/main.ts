import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 按需引入
import registerApp from './global/index'
const app = createApp(App)
registerApp(app)
// app.use(ElementPlus)
app.use(store).use(router).mount('#app')
