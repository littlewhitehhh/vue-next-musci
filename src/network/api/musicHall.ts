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
export function getPrivateConentList(): any {
  return MyAxios.get({
    url: '/personalized/privatecontent'
  })
}

// 推荐新音乐
export function getRcmdPlaylsit(limit = 12): any {
  return MyAxios.get({
    url: '/personalized/newsong',
    params: { limit }
  })
}

// 推荐mv

export function getRcmdMV(): any {
  return MyAxios.get({
    url: '/personalized/mv'
  })
}
