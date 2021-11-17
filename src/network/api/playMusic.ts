import MyAxios from '../index'

//获取音乐详情

export function getMusicDetail(id: string) {
  return MyAxios.get({
    url: '/song/detail',
    params: { ids: id }
  })
}

// 获取音乐url
export function getMusicUrl(params: any) {
  return MyAxios.get({
    url: '/song/url',
    params
  })
}
