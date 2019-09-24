<template>
  <div class="column-wrap">
    <div class="article-list">
        <div class="tit">{{ $route.params.type}}专栏</div>
        <template v-if="!articleList">
          <div class="empty-wrap">
            <a-icon type="form" />
            <div class="empty-text">该专栏暂时没有内容，赶快来<router-link to="/addArticle">发布一篇</router-link>吧</div>
          </div>
        </template>
        <article-item v-for="(item,i) in articleList" :key="i" :article="item"></article-item>
    </div>
    <div class="column-aside">

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ArticleItem from '@/components/ArticleItem.vue';

@Component({
  components: { ArticleItem }
})
export default class Home extends Vue {
  public name: string = 'xujiang';

  get articleList(): object {
      return this.$store.state.articles[this.$route.params.type]
  }

  public addAsync(num: any) {
    this.$store.dispatch('asyncAdd', {num});
  }
}
</script>

<style lang="less" scoped>
.column-wrap {
    width: 90%;
    margin: 20px auto;
    display: flex;
    .article-list {
      flex: 1;
      margin-top: 10px;
      .tit {
          position: relative;
          font-size: 20px;
          text-align: center;
          line-height: 3em;
          &::before, &::after {
              content: '- - -';
              display: inline-block;
              color: rgb(230, 227, 227);
          }
          &::before {
              margin-right: 10px;
          }
          &::after {
              margin-left: 10px;
          }
      }
      .empty-wrap {
        margin-top: 60px;
        margin-bottom: 60px;
        text-align: center;
        color: #ccc;
        .anticon {
          font-size: 48px;
        }
        .empty-text {
          margin-top: 20px;
        }
      }
    }

    .column-aside {
      width: 180px;
      margin-left: 20px;
    }
}
</style>

