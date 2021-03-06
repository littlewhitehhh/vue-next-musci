import { App } from 'vue'
// 引入样式
import 'element-plus/dist/index.css'
import {
  ElAside,
  ElAvatar,
  ElButton,
  ElCarousel,
  ElCarouselItem,
  ElContainer,
  ElDialog,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElPopover
} from 'element-plus/lib/components'

const Components = [
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElFooter,
  ElInput,
  ElForm,
  ElFormItem,
  ElPopover,
  ElAvatar,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElCarousel,
  ElCarouselItem
]

function registerElementPlus(app: App): void {
  Components.forEach((component) => {
    app.component(component.name, component)
  })
}
export default registerElementPlus
