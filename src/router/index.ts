import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/home.vue'),
    children: [
      { path: '/home', redirect: '/musicHall' },
      {
        path: '/recommend',
        name: 'recommend',
        component: () => import('@/views/recommend/recommend.vue')
      },
      // 音乐馆
      {
        path: '/musicHall',
        name: 'musicHall',
        component: () => import('@/views/musicHall/musicHall.vue')
      },
      // music video
      {
        path: '/video',
        name: 'myVideo',
        component: () => import('@/views/video/video.vue')
      },
      // 私人FM
      {
        path: '/personalFM',
        name: 'personalFM',
        component: () => import('@/views/personalFM/personalFM.vue')
      },

      {
        path: '/myLike',

        name: 'myLike',
        component: () => import('@/views/myLike/myLike.vue')
      },
      {
        path: '/localMusic',

        name: 'localMusic',
        component: () => import('@/views/localMusic/localMusic.vue')
      },
      {
        path: '/musicCloud',

        name: 'musicCloud',
        component: () => import('@/views/musicCloud/musicCloud.vue')
      },
      {
        path: '/currentPlay',

        name: 'currentPlay',
        component: () => import('@/views/currentPlay/currentPlay.vue')
      },
      //搜索页面
      {
        path: '/search/:keyword',
        name: 'search',
        component: () => import('@/views/search/search.vue')
      },
      //歌单界面
      {
        path: '/playlist/:id',

        name: 'playList',
        component: () => import('@/views/playList/playList.vue')
      },
      //专辑界面
      {
        path: '/artist/:id',
        name: 'artist',
        component: () => import('@/views/artist/artist.vue')
      },
      //歌手界面
      {
        path: '/album/:id',
        name: 'album',
        component: () => import('@/views/album/album.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由还有毛病
router.beforeEach((to, from, next) => {
  // console.log(to)

  if (
    to.path !== '/musicHall' &&
    to.path !== '/video' &&
    to.path !== `/search/${to.params.keyword}` &&
    to.path !== `/playlist/${to.params.id}` &&
    to.path !== `/artist/${to.params.id}` &&
    to.path !== `/album/${to.params.id}`
  ) {
    const token = window.localStorage.getItem('token')
    if (token) {
      next()
    } else {
      alert('请先登录')
      window.sessionStorage.setItem('activePath', '/musicHall')
      next({ path: '/musicHall' })
    }
  } else {
    next()
  }
})

export default router
