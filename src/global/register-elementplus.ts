import { App } from 'vue'
// 引入样式
import 'element-plus/dist/index.css'
import { ElButton } from 'element-plus/lib/components'

const Components = [ElButton]

function registerElementPlus(app: App): void {
  Components.forEach((component) => {
    app.component(component.name, component)
  })
}
export default registerElementPlus
