import MyAxios from '../index'

// 获取全部mv
interface getAllMvType {
  area?: string
  type?: string
  order?: string
  limit?: number
  offset?: number
}
export function getAllMv(params: getAllMvType): any {
  return MyAxios.get({
    url: '/mv/all',
    params
  })
}
