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
      {
        path: '/musicHall',
        name: 'musicHall',
        component: () => import('@/views/musicHall/musicHall.vue')
      },
      {
        path: '/video',
        name: 'myVideo',
        component: () => import('@/views/video/video.vue')
      },
      {
        path: '/personalFM',
        name: 'personalFM',
        component: () => import('@/views/personalFM/personalFM.vue')
      },
      {
        path: '/playList/:id',

        name: 'playList',
        component: () => import('@/views/playList/playList.vue')
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/musicHall' && to.path !== '/video') {
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
