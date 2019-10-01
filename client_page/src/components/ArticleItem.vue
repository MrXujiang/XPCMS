<template>
    <div class="article-item">
        <div class="img-wrap">
            <img :src="article.faceUrl" alt="">
            <span class="label">{{ article.label }}</span>
        </div>
        <div class="article-content">
            <router-link class="article-tit" :to="{ name:'previewArticle', params: { label: article.label }, query: { id: article.id }}">{{ article.tit }}</router-link>
            <div class="article-desc">
                {{ article.desc }}
            </div>
            <div class="article-ft">
                <div class="article-pubtime">{{ article.time }}</div>
                <div class="view"><a-icon type="eye" />&nbsp;{{ article.views }}</div>
                <div class="article-flover"><a-icon type="fire" />&nbsp;{{ article.flover }}</div>
            </div>
        </div>
    </div>   
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ArticleItem extends Vue {

  @Prop()
  article: object;

}
</script>

<style lang="less" scoped>
    .article-item {
        padding: 16px;
        display: flex;
        border-bottom: 1px dashed #f0f0f0;
        background-color: #fff;
        .img-wrap {
            position: relative;
            width: 160px;
            margin-right: 2%;
            img {
                width: 100%;
            }
            .label {
                position: absolute;
                left: 6px;
                top: 6px;
                padding: 2px 8px;
                border-radius: 6px;
                color: #fff;
                font-size: 12px;
                background: rgba(0,0,0,.5);
            }
        }
        .article-content {
            flex: 1;
            .article-tit {
                line-height: 1.6em;
                font-size: 18px;
                color: #000;
            }
            .article-ft {
                margin-top: 20px;
                display: flex;
                color: #999;
                div {
                    padding-right: 20px; 
                }
            }
        }
    }
</style>


