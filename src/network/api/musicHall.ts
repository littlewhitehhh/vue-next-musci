import MyAxios from '@/network/index'

//featured页面
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

//playlist页面

//获取热门标签
export function gethotTags(): any {
  return MyAxios.get({
    url: '/playlist/hot '
  })
}

interface getTopPlaylistType {
  order?: string
  cat?: string
  limit?: number
  offset?: number
}
// 根据热门标签获取歌单
export function getTopPlaylist(params: getTopPlaylistType): any {
  return MyAxios.get({
    url: '/top/playlist',
    params
  })
}
// 获取精品歌单标签
export function getHighqualityTags(): any {
  return MyAxios.get({
    url: '/playlist/highquality/tags'
  })
}

interface getHighqualityPlaylistType {
  cat?: string
  limit?: number
  offset?: number
}
// 根据热门标签获取歌单
export function getHighqualityPlaylist(params: getHighqualityPlaylistType): any {
  return MyAxios.get({
    url: '/top/playlist/highquality',
    params
  })
}

// '/playlist/catlist'   表单全部分类
// /playlist/hot  热门标签
// /top/playlist  网友精选碟 歌单
// /playlist/highquality/tags 精品歌单标签
// /top/playlist/highquality  精品歌单

//  privateContent页面

interface AllPrivateConentList {
  limit?: number
  offset?: number
}

export function getAllPrivateConentList(params: AllPrivateConentList): any {
  return MyAxios.get({
    url: '/personalized/privatecontent/list',
    params
  })
}

//排行榜 页面
export function getTopList(): any {
  return MyAxios.get({
    url: '/toplist/detail'
  })
}

// 获取歌手信息
interface getArtistType {
  limit?: number
  offset?: number

  type?: string
  area?: string
}
export function getArtist(params: getArtistType): any {
  return MyAxios.get({
    url: '/artist/list',
    params
  })
}

// 获取新歌速递列表
interface getNewSongsType {
  type: string
}
export function getNewSongs(params: getNewSongsType): any {
  return MyAxios.get({
    url: '/top/song',
    params
  })
}
