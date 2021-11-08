import MyAxios from '@/network/index'

//获取轮播图
export function getBanner(): any {
  return MyAxios.get({
    url: '/banner'
  })
}

// 获取推荐歌单

export function getRecommendPlaylist(limit = 10): any {
  return MyAxios.get({
    url: '/personalized',
    params: { limit }
  })
}

// 获取独家放送(入口列表)
export function getPrivateConentList({ limit = 3, offset = 0 }): any {
  return MyAxios.get({
    url: '/personalized/privatecontent/list',
    params: { limit, offset }
  })
}
