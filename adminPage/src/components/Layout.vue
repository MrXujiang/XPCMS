<template>
  <a-layout class="layout-wrap">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo">众学CMS</div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[curSelected]" :defaultOpenKeys="['sub1']">
        <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="mail" /><span>首页</span></span>
            <a-menu-item key="1"><router-link to="/">头部</router-link></a-menu-item>
            <a-menu-item key="2"><router-link to="/banner">banner栏</router-link></a-menu-item>
            <a-menu-item key="3"><router-link to="/bannerSider">侧边信息</router-link></a-menu-item>
        </a-sub-menu>
        <a-menu-item key="4">
          <a-icon type="video-camera" />
          <span><router-link to="/article" style="color: inherit; textDecoration: none">文章列表</router-link></span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="pay-circle" />
          <span><router-link to="/support" style="color: inherit; textDecoration: none">赞赏设置</router-link></span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="picture" />
          <span><router-link to="/imgManage" style="color: inherit; textDecoration: none">图片管理</router-link></span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="video-camera" />
          <span><router-link to="/videoManage" style="color: inherit; textDecoration: none">视频管理</router-link></span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="line-chart" />
          <span><router-link to="/websiteAnalysis" style="color: inherit; textDecoration: none">网站统计</router-link></span>
        </a-menu-item>
        <a-menu-item key="9">
          <a-icon type="user" />
          <span><router-link to="/admin" style="color: inherit; textDecoration: none">管理员</router-link></span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <a-dropdown class="user-info">
            <a class="ant-dropdown-link">
            {{ admin.username }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
            <a-menu-item>
                <a href="javascript:;">修改资料</a>
            </a-menu-item>
            <a-menu-item>
                <a @click="logout">退出</a>
            </a-menu-item>
            </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', overflow: 'auto' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Vue, Watch, Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Route } from 'vue-router';
import http from '../utils/http';

// 页面路由表
const routeMap: any = {
    '/': '1',
    '/banner': '2',
    '/bannerSider': '3',
    '/article': '4',
    '/addArticle': '4',
    '/support': '5',
    '/imgManage': '6',
    '/videoManage': '7',
    '/websiteAnalysis': '8',
    '/admin': '9',
};

@Component
export default class Layout extends Vue {
  @Prop()
  admin: object;

  public collapsed: boolean = false;
  public curSelected: any = '';

  public logout() {
    http.get('/admin/logout').then(res => {
      this.$message.success(res.data, 2, () => {
        this.$router.push('/login')
      })
    }).catch(err => {
      console.log(err)
    })
  }

  public created() {
    this.curSelected = routeMap[location.pathname]
  }

//   public beforeRouteLeave(to: any, from: any, next: any) {
//     const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
//     if (answer) {
//         next();
//     } else {
//         next(false);
//     }
//   }  ********** 官网的配置没效果，待解决 *********

  @Watch('$route')
  private routeChange(val: Route, oldVal: Route) {
      //  do something
      if(val.path.indexOf('/preview') < 0) {
        this.curSelected = routeMap[val.path] || routeMap[oldVal.path];
      }
  }
}
</script>

<style lang="less" scoped>
.layout-wrap {
    height: 100vh;
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
        &:hover {
            color: #1890ff;
        }
    }

    .logo {
      height: 32px;
      margin: 16px;
      font-size: 28px;
      font-weight: bold;
      text-align: center;
    }

    .user-info {
        float: right;
        margin-right: 24px;
    }
} 

</style>


