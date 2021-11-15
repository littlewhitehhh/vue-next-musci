import MyAxios from '@/network/index'

// 热门搜索
export function searchHot(): any {
  return MyAxios.get({
    url: '/search/hot/detail'
  })
}
//根据关键词推荐搜索建议
export function searchSuggest(keywords: string): any {
  return MyAxios.get({
    url: '/search/suggest',
    params: { keywords }
  })
}
export function searchResult(keywords: any): any {
  return MyAxios.get({
    url: '/search/multimatch',
    params: { keywords: keywords }
  })
}
