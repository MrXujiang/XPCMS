<template>
  <div class="article-wrap">
    <div class="article">
      <div class="tit">{{ articleDetail.tit }}</div>
      <div class="article-info">
        <span class="article-type">{{ articleDetail.label }}</span>
        <span class="article-time">{{ articleDetail.time }}</span>
        <span class="article-views"><a-icon type="eye" />&nbsp;{{ articleDetail.views }}</span>
        <span class="article-flover"><a-icon type="fire" />&nbsp;{{ articleDetail.flover }}</span>
      </div>
      <div class="article-content" v-html="articleContent"></div>
      <div class="article-ft">
        <div class="article-label">

        </div>
        <div class="support-author">
          <p>给作者打赏，鼓励TA抓紧创作！</p>
          <div class="support-wrap">
            <a-button class="btn-pay" type="danger" ghost @click="showPayModel">赞赏</a-button>
            <a-button class="btn-flover" type="primary">点赞</a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="aside" v-if="!+screenType">

    </div>
    <content-model :visible="isPayShow" :onCancel="onPayCancel" width="300px">
      <div class="img-wrap">
        <img :src="supportPay.imgUrl" alt="">
        <p>{{ supportPay.tit }}</p>
      </div>
    </content-model>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContentModel from '@/components/ContentModel.vue'
import http from '../../utils/http'

@Component({
  components: { ContentModel }
})
export default class Article extends Vue {
  public name: string = 'xujiang';

  public articleContent: string = '';

  public isPayShow: boolean = false;

  get screenType():string {
    return this.$store.state.curScreen
  }

  get articleDetail(): any {
    return this.$store.state.articleDetail && this.$store.state.articleDetail[0]
  }

  get supportPay(): object {
    return this.$store.state.config.supportPay
  }

  public created(): void {
    this.$store.commit('getArticleDetail', {label: this.$route.params.label, id: this.$route.query.id})
    // 获取文章内容
    http.get(this.articleDetail.articleUrl).then(res => {
        this.articleContent = res.content
    })
  }

  public showPayModel(): void {
    this.isPayShow = true;
  }

  public onPayCancel(): void {
    this.isPayShow = false;
  }
}
</script>

<style lang="less" scoped>
  .article-wrap {
    width: 90%;
    margin: 20px auto;
    display: flex;
    .article {
      flex: 1;
      padding: 20px;
      background-color: #fff;
      .tit {
        font-size: 20px;
      }
      .article-info {
        line-height: 3em;
        color: #999;
        .article-type {
          padding: 3px 8px;
          border-radius: 6px;
          line-height: 1.2;
          color: #fff;
          background-color: rgba(38, 129, 204, 0.5);
        }
        span {
          display: inline-block;
          margin-right: 20px;
        }
      }
      .article-content {
        margin-top: 20px;
      }
      .article-ft {
        margin-top: 20px;
        .support-author {
          padding-top: 20px;
          padding-bottom: 20px;
          text-align: center;
          background-color: #F2F5FB;
          .support-wrap {
            margin-top: 20px;
            .btn-flover {
              margin-left: 20px;
            }
          }
        }
      }
    }
    .aside {
      margin-left: 20px;
      width: 180px;
    }
  }
  .img-wrap {
    text-align: center;
    img {
      width: 90%;
    }
    p{
      padding-top: 12px;
      font-weight: bold;
    }
  }
</style>

