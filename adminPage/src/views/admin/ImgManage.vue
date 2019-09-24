<template>
  <div class="gallary-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">图片库:</a-col>
            <a-col :span="20">
              <div class="img-box" v-for="(item,i) in images" :key="i">
                <a-card
                  hoverable
                  style="width: 240px"
                >
                  <img
                    :alt="item.source"
                    :src="item.url"
                    slot="cover"
                    @click="showPreview(item.url)"
                  />
                  <a-card-meta
                    title="来源">
                    <template slot="description">{{ item.source }}</template>
                  </a-card-meta>
                </a-card>
              </div>
            </a-col>
        </a-row>

        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewUrl" />
        </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
import http from '../../utils/http';

@Component
export default class Video extends Vue {
  public name: string = 'gallery';

  public previewVisible: boolean = false;

  public previewUrl: string = ''

  public images: any[] = [];

  public created():void {
     http.get('/files/gallery').then(res => {
       this.images = res.data
     }).catch(err => {
       console.log(err)
     })
  }

  public handleCancel():void {
    this.previewVisible = false
  }

  public showPreview(url):void {
    this.previewVisible = true
    this.previewUrl = url
  }
  
}
</script>

<style lang="less" scoped>
   .gallary-wrap {
      .img-box {
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 20px;
        img {
          height: 160px;
        }  
      }
   }
</style>

