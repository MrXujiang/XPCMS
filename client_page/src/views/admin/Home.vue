<template>
  <div class="home-wrap">
    <layout :admin="admin"></layout>
    <div class="tool-bar">
      <div class="tool-item">
        <a-tooltip style="marginTop: 10px" placement="left" title="预览" :autoAdjustOverflow="false" :visible="true">
          <router-link to="/preview"><a-icon type="eye" /></router-link>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
import http from '../../utils/http';

@Component({
  components: {
    Layout,
  },
})
export default class Home extends Vue {
  public admin: object = {};

  public onclick(): void {
    this.name = 'hello world';
  }

  public beforeCreated(): void {
    
  }

  public created(): void {
    http.get('/admin/getCurAdminInfo').then(res => {
      this.admin = res
    });
    this.$store.dispatch('setConfig')
    this.$store.dispatch('getArticles')
  }


  public mounted(): void {

  }

  public add() {
    this.$store.commit('add');
  }

  public addAsync(num: any) {
    this.$store.dispatch('asyncAdd', {num});
  }
}
</script>
<style lang="less" scoped>
.tool-bar {
  position: fixed;
  bottom: 120px;
  right: 60px;
  .tool-item {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 6px rgba(0,0,0, .1);
  }
}
</style>

