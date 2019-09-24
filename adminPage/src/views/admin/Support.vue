<template>
  <div class="index-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 6 }" :lg="{ span: 4 }" class="column-tit">文章赞赏设置:</a-col>
            <a-col :span="18">
                <a-form
                    :form="form"
                    @submit="handleSubmit"
                >
                    <a-form-item
                    label="支付方式"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                    >
                    <a-input
                        v-decorator="[
                        'tit',
                        {
                          rules: [{ required: true, message: '请输入标题!' }],
                          initialValue: supportPay.tit
                        }
                        ]"
                    />
                    </a-form-item>
                    <a-form-item
                    label="支付二维码"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                    >
                    <upload
                      action="/api/v0/files/uploadSingle"
                      :defaultValue="supportPay.imgUrl"
                      :onFileDel="onFileDel"
                      :onFileChange="onFileChange"
                      :data="uploadData"
                    >
                    </upload>
                        
                    </a-form-item>
                    <a-form-item
                    :wrapper-col="{ span: 12, offset: 6 }"
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
import Upload from '@/components/Upload.vue';

@Component({
  components: {
    Upload
  }
})
export default class SupportPay extends Vue {
  public name: string = 'supportPay';

  public formLayout: string = 'horizontal';

  public uploadData: object = {
    source: 'supportPay'
  }

  public form: any;

  get supportPay(): any {
    return this.$store.state.config.supportPay;
  }

  public beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  public onFileDel(file: any) {
    // this.$store.commit('setLogo', '')
  }

  public onFileChange(fileUrl: string) {
    this.$store.commit('setSupportPayImgUrl', fileUrl)
  }

  public mounted(): void {

  }

  public handleSubmit(e: any) {
      e.preventDefault();
      this.form.validateFields((err: any, values: any) => {
        if (!err) {
          this.$store.dispatch('saveSupportPay', {
            tit: values.tit,
            imgUrl: this.supportPay.imgUrl
          });
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

