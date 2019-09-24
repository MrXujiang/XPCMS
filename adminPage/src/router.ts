import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/admin/Home.vue';
import Preview from './views/preview/Container.vue';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: (to, from, next) => {
        next();
      },
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '',
          name: 'header',
          component: () => import(/* webpackChunkName: "header" */ './views/admin/subpage/Header.vue'),
        },

        {
          path: '/banner',
          name: 'banner',
          component: () => import(/* webpackChunkName: "banner" */ './views/admin/subpage/Banner.vue'),
        },

        {
          path: '/bannerSider',
          name: 'bannerSider',
          component: () => import(/* webpackChunkName: "bannerSider" */ './views/admin/subpage/BannerSider.vue'),
        },

        {
          path: '/article',
          name: 'article',
          component: () => import(/* webpackChunkName: "article" */ './views/admin/Article.vue'),
        },

        {
          path: '/support',
          name: 'support',
          component: () => import(/* webpackChunkName: "supportPay" */ './views/admin/Support.vue'),
        },

        {
          path: '/addArticle',
          name: 'addArticle',
          meta: {keepAlive: false},
          component: () => import(/* webpackChunkName: "addArticle" */ './views/admin/AddArticle.vue'),
        },

        {
          path: '/videoManage',
          name: 'videoManage',
          component: () => import(/* webpackChunkName: "videoManage" */ './views/admin/VideoManage.vue'),
        },

        {
          path: '/imgManage',
          name: 'imgManage',
          component: () => import(/* webpackChunkName: "imgManage" */ './views/admin/ImgManage.vue'),
        },

        {
          path: '/websiteAnalysis',
          name: 'websiteAnalysis',
          component: () => import(/* webpackChunkName: "websiteAnalysis" */ './views/admin/WebsiteAnalysis.vue'),
        },

        {
          path: '/admin',
          name: 'admin',
          component: () => import(/* webpackChunkName: "admin" */ './views/admin/Admin.vue'),
        },
      ],
    },
    {
      path: '/preview',
      // name: 'preview',  // 有子路由时name可以建议去掉
      component: Preview,
      children: [
        {
          path: '',
          name: 'previewIndex',
          component: () => import(/* webpackChunkName: "previewIndex" */ './views/preview/Home.vue')
        },
        {
          path: 'column/:type',
          name: 'previewColumn',
          component: () => import(/* webpackChunkName: "previewColumn" */ './views/preview/Column.vue')
        },
        {
          path: 'article/:label',
          name: 'previewArticle',
          component: () => import(/* webpackChunkName: "previewArticle" */ './views/preview/Article.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta:{
        keepAlive:false //不需要被缓存的组件
      }
    },
    {
      path: '*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(from.path.indexOf('/preview') < 0) {
    sessionStorage.setItem('prevToPreviewPath', from.path);
  }
  next();
})

export default router
