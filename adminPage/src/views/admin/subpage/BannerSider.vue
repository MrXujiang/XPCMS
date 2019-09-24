<template>
  <div class="index-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 6 }" :lg="{ span: 4 }" class="column-tit">banner侧边栏:</a-col>
            <a-col :span="18">
                <a-form
                    :form="form"
                    @submit="handleSubmit"
                >
                    <a-form-item
                    label="标题"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 12 }"
                    >
                    <a-input
                        v-decorator="[
                        'tit',
                        {
                          rules: [{ required: true, message: '请输入标题!' }],
                          initialValue: bannerSider.tit
                        }
                        ]"
                    />
                    </a-form-item>
                    <a-form-item
                    label="描述信息"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 12 }"
                    >
                    <a-input
                        v-decorator="[
                        'desc',
                        {
                          initialValue: bannerSider.desc
                        }
                        ]"
                    />
                    </a-form-item>
                    <a-form-item
                    label="图片"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 12 }"
                    >
                    <upload
                      action="/api/v0/files/uploadSingle"
                      :defaultValue="bannerSider.imgUrl"
                      :onFileDel="onFileDel"
                      :onFileChange="onFileChange"
                      :data="uploadData"
                    >
                    </upload>
                        
                    </a-form-item>
                    <a-form-item
                    :wrapper-col="{ span: 12, offset: 3 }"
                    >
                    <a-button
                        type="primary"
                        html-type="submit"
                    >
                        保存
                    </a-button>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import Upload from '@/components/Upload.vue';

@Component({
  components: {
    Upload
  }
})
export default class BannerSider extends Vue {
  public name: string = 'BannerSider';

  public uploadData: object = {
    source: 'bannerSider'
  }

  public formLayout: string = 'horizontal';

  public imgUrl: string;

  public form: any;

  get bannerSider(): any {
    return this.$store.state.config.bannerSider;
  }

  public beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  public onFileDel(file: any) {
    this.$store.commit('setBannerSiderImgUrl', '')
  }

  public onFileChange(fileUrl: string) {
    this.$store.commit('setBannerSiderImgUrl', fileUrl)
  }

  public mounted(): void {

  }

  public handleSubmit(e: any) {
      e.preventDefault();
      this.form.validateFields((err: any, values: any) => {
        if (!err) {
          this.$store.dispatch('saveBannerSider', { ...values, imgUrl: this.bannerSider.imgUrl })
        }
      });
  }
}
</script>

<style lang="less" scoped>
    .column-tit {
        font-size: 16px;
    }

    .column-tag {
        font-size: 16px;
        height: 1.8em;
        line-height: 1.8em;
    }

</style>

