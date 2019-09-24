<template>
  <div class="video-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">视频分类:</a-col>
            <a-col :span="20">
                <empty />
            </a-col>
        </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Empty from '@/components/Empty.vue';
import Layout from '@/components/Layout.vue'; // @ is an alias to /src

@Component({
  components: { Empty }
})
export default class Video extends Vue {
  public name: string = 'article';

  public add() {
    const panes = this.panes
    const activeKey = `newTab${this.newTabIndex++}`
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
    this.panes = panes
    this.activeKey = activeKey
  }

  public addAsync(num: any) {
    this.$store.dispatch('asyncAdd', {num});
  }
}
</script>

<style lang="less" scoped>
  .video-wrap {
    .card-item {
      width: 300px;
      display: inline-block;
      margin-right: 18px;
      margin-bottom: 18px;
      &:nth-child(3n+1) {
        margin-right: 0;
      }
    }
  }
</style>

