<template>
  <div class="site-wrap">
    <div class="">
        <a-row>
            <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">用户统计:</a-col>
            <a-col :span="20">
                <a-badge :count="99">
                   <span class="num-box">用户数<br />1234</span>
                </a-badge>
                <a-badge :count="99">
                   <span class="num-box">日活数<br />1234</span>
                </a-badge>
                <a-badge :count="99">
                   <span class="num-box">会员数<br />300</span>
                </a-badge>
            </a-col>
        </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';

@Component
export default class Video extends Vue {
  public name: string = 'article';

  public addAsync(num: any) {
    this.$store.dispatch('asyncAdd', {num});
  }

  get total(): void {
    return this.$store.state.total;
  }
}
</script>

<style lang="less" scoped>
  .site-wrap {
      .ant-badge {
          margin-right: 40px;
      }
      .num-box {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 20px;
          line-height: 1.6em;
          background-color: #f0f0f0;
      }
  }
</style>

