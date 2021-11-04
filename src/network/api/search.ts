import MyAxios from '@/network/index'

// 热门搜索
export function searchHot(): any {
  return MyAxios.get({
    url: '/search/hot/detail'
  })
}
//根据关键词推荐搜索结果
export function searchSuggest(keywords: string): any {
  return MyAxios.get({
    url: '/search/suggest',
    params: { keywords }
  })
}
