<template>
  <div class="index-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">{{type ? '修改文章' : '添加文章'}}:</a-col>
            <a-col :span="18">
                <a-form 
                    :form="form"
                    @submit="handleSubmit"
                >
                    <a-form-item
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        label="标题"
                    >
                        <a-input
                        v-decorator="[
                            'tit',
                            {
                                rules: [{ required: true, message: '请输入标题!' }],
                                initialValue: articleData && articleData.tit
                            }
                            ]"
                            placeholder="请输入标题"
                        />
                    </a-form-item>
                    <a-form-item
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        label="分类"
                    >
                        <a-select
                            v-decorator="[
                            'cate',
                            {
                                rules: [{ required: true, message: '请输入文章分类' }],
                                initialValue: articleData && articleData.label
                            },
                            ]"
                            placeholder="请选择分类"
                        >
                            <a-select-option v-for="(item,i) in columns" :value="item" :key="i">
                                {{item}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        label="封面图"
                    >
                        <a-upload
                            name="file"
                            listType="picture-card"
                            class="avatar-uploader"
                            :showUploadList="false"
                            action="/api/v0/files/uploadSingle"
                            :beforeUpload="beforeUpload"
                            @change="handleChange"
                            v-decorator="[
                            'faceBg',
                            ]"
                            :data="{source: 'article'}"
                        >
                            <img v-if="imageUrl" :src="imageUrl" alt="封面图" style="width: 100%" />
                            <div v-else>
                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </a-upload>
                    </a-form-item>
                    <template v-if="!type || articleContent">
                        <a-form-item
                            :label-col="labelCol"
                            :wrapper-col="{ span: 21 }"
                            label="内容"
                        >
                        <editor ref="editor" :value="articleContent"></editor>
                    </a-form-item>
                    </template>
                    <a-form-item
                        :wrapper-col="{ span: 12, offset: 5 }"
                    >
                        <a-button
                            type="primary"
                            html-type="submit"
                        >
                            提交
                        </a-button>
                        <a-button
                            html-type="submit"
                            class="ml-30"
                            @click="back"
                        >
                            返回
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
import Editor from '@/components/Editor.vue';
import http from '../../utils/http';

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

@Component({
    components: {
        Editor,
    },
})
export default class AddArticle extends Vue {
  public name: string = 'addArticle';
  public form: any;
  public type: number = 0;
  public labelCol: object = {
    xs: { span: 24 },
    sm: { span: 3 },
  };

  public wrapperCol: object = {
    xs: { span: 24 },
    sm: { span: 12 },
  };

  public loading: boolean = false;

  public imageUrl: string = '';

  public articleContent: string = '';

  get articleData(): any {
      return this.$store.state.articleDetail && this.$store.state.articleDetail[0]
  }

  get columns():string[] {
      return this.$store.state.config.header.columns
  }

  public beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  public created() {
    let { id, label } = this.$route.query;
    this.type = id ? 1 : 0;
    if(id) {
        this.$store.commit('getArticleDetail', { id, label })
        this.imageUrl = this.articleData.faceUrl || '';
        // 获取文章内容
        http.get(this.articleData.articleUrl).then(res => {
            this.articleContent = res.content
        })
    }
  }

  public handleChange (info: any) {
    if (info.file.status === 'uploading') {
        this.loading = true
        return
    }
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl
            this.loading = false
        })
    }
  }
  public beforeUpload (file: any) {
      const isCorrentFormat = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isCorrentFormat) {
        this.$message.error('你只能上传jpg和png格式的图片!')
      }
      const isLt1M = file.size / 1024 / 1024 <= 1
      if (!isLt1M) {
        this.$message.error('图片必须小于 1MB!')
      }
      return isCorrentFormat && isLt1M
    }

  public handleSubmit(e: any) {
      e.preventDefault();
      this.form.validateFields((err: any, values: any) => {
        if (!err) {
            let { getContent } = this.$refs.editor as any;
            let content = getContent();
            if(content) {
                if(this.type) {
                    this.$store.dispatch('editArticle', {
                        id: this.articleData.id,
                        tit: values.tit,
                        label: values.cate,
                        prevLabel: this.articleData.label,
                        faceUrl: values.faceBg && values.faceBg.file.response && values.faceBg.file.response.url || this.articleData.faceBg,
                        content
                    }).then(() => {
                        this.$router.go(-1);
                    });
                }else {
                    this.$store.dispatch('addArticle', {
                        tit: values.tit,
                        label: values.cate,
                        faceUrl: values.faceBg && values.faceBg.file.response && values.faceBg.file.response.url,
                        content
                    }).then(() => {
                        this.$router.go(-1);
                    });
                    
                }
                
            }else {
                this.$message.error('博客内容不能为空');
            }
            
        }
      });
  }

  public back() {
      this.$router.push('/article');
  }

  public beforeDestroy():void {
      this.$store.commit('emptyArticle');
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader > .ant-upload {
    width: 168px;
    height: 168px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>

