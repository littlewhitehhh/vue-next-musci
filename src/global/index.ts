import registerElementPlus from './register-elementplus'
import { App } from 'vue'

function registerApp(app: App): void {
  registerElementPlus(app)
}

export default registerApp
