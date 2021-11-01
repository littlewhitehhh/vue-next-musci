import { App } from 'vue'
// 引入样式
import 'element-plus/dist/index.css'
import {
  ElAside,
  ElButton,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain,
  ElPopover
} from 'element-plus/lib/components'

const Components = [
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElInput,
  ElForm,
  ElFormItem,
  ElPopover
]

function registerElementPlus(app: App): void {
  Components.forEach((component) => {
    app.component(component.name, component)
  })
}
export default registerElementPlus
