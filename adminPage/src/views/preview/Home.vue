<template>
  <div class="home-wrap">
    <div class="banner-wrap">
        <template v-if="!+curScreen">
            <div class="banner-sider">
                <div class="tit">{{ bannerSider.tit }}</div>
                <img :src="bannerSider.imgUrl" alt="">
                <div class="desc">{{ bannerSider.desc }}</div>
            </div>
            <a-carousel effect="fade" class="banner" v-if="bannerData.type === '1'">
                <a class="banner-img" href="" v-for="(item, i) in bannerData.bannerList" :key="i" :style="{backgroundImage: 'url('+ item.imgUrl +')'}">
                    <p class="tit">{{ item.tit }}</p>
                </a>
            </a-carousel>
            <div class="banner" v-if="bannerData.type === '0'">
                <div class="banner-img" :style="{backgroundImage: 'url('+ bannerData.bgUrl +')'}">
                    <span class="banner-label" v-for="(item,i) in bannerData.label" :key="i" :style="{left: 80*(i+1) + 'px'}">
                        {{ item }}
                    </span>
                </div>
            </div>
        </template>
        <template v-else>
            <a-carousel effect="fade">
                <a class="banner-img" href="" v-for="(item, i) in bannerData.bannerList" :key="i" :style="{backgroundImage: 'url('+ item.imgUrl +')'}">
                    <p class="tit">{{ item.tit }}</p>
                </a>
            </a-carousel>
        </template>  
    </div>
    <div class="article-list">
        <div class="tit">最新文章</div>
        <article-item v-for="(item,i) in articleList" :key="i" :article="item"></article-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import ArticleItem from '@/components/ArticleItem.vue'

@Component({
  components: {
    ArticleItem
  }
})
export default class Home extends Vue {
  public name: string = 'xujiang';

  get curScreen(): string {
      return this.$store.state.curScreen
  }

  get bannerData(): object {
      return this.$store.state.config.banner
  }

  get bannerSider(): object {
      return this.$store.state.config.bannerSider
  }

  get articleList(): object {
      return this.$store.state.articleList
  }

  public onclick(): void {
    this.name = 'hello world';
  }

  public add() {
    this.$store.commit('add');
  }

  public addAsync(num: any) {
    this.$store.dispatch('asyncAdd', {num});
  }

  get total(): void {
    return this.$store.state.total;
  }
}
</script>

<style scoped lang="less">
.home-wrap {
    margin: 16px 1%;
    .banner-wrap {
        // display: flex;
        .banner {
            position: relative;
            margin-right: 220px;
            &.mobile {
               margin-right: 0; 
            }
            .banner-label {
                position: absolute;
                bottom: 20px;
                display: inline-block;
                padding: 3px 6px;
                margin-right: 20px;
                border-radius: 6px;
                background-color: rgba(0,0,0, .2);
            }
        }
        .banner-img {
                position: relative;
                display: block;
                height: 240px;
                background-position: center center;
                background-size: 100%;
                text-decoration: none;
                color: #fff;
                text-align: center;
                background-repeat: no-repeat;
                .tit {
                    position: absolute;
                    bottom: 20px;
                    left: -100%;
                    padding: 4px 10px;
                    background-color: rgba(0,0,0, .3);
                    transition: left .6s;
                }
                &:hover .tit {
                    left: 50%;
                    transform: translateX(-50%)
                }
            }
        .ant-carousel > .slick-slide {
            text-align: center;
            height: 160px;
            line-height: 160px;
            background: #364d79;
            overflow: hidden;
        }

        .ant-carousel > .slick-slide h3 {
            color: #fff;
        }

        .banner-sider {
            float: right;
            width: 200px;
            padding: 20px;
            background-color: #fff;
            .tit {
                padding-bottom: 10px;
            }
            img {
                width: 100%;
            }
            .desc {
                line-height: 2em;
            }
        }
    }

    .article-list {
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
    }
    
}
</style>

