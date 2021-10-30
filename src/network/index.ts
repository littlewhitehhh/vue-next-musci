import MyRequest from './request/request'
import { BASE_URL, TIME_OUT } from './request/config'

const MyAxios = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default MyAxios
