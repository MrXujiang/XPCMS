<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
  get key() {
    // 缓存除预览页面之外的其他页面
    console.log(this.$route.path)
    if(this.$route.path.indexOf('/preview') > -1) {
      return '0'
    }else if(this.$route.path === '/login') {
      return '1'
    }else {
      return '2'
    }
  }
}
</script>

<style lang="less">
p {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.text-overflow-20 {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mt-30 {
  margin-top: 30px;
}

.mt-20 {
  margin-top: 20px;
}

.mb-20 {
  margin-bottom: 20px;
}

.mb-10 {
  margin-bottom: 10px;
}

.ml-30 {
  margin-left: 30px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
</style>
