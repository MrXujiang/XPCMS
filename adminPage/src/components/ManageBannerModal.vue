<template>
    <a-modal
        :title="bannerModelType === 'add' ? '添加banner图' : '修改banner图'"
        :visible="visible"
        @ok="handleSubmit"
        @cancel="handleCancel"
        okText="确认"
        cancelText="取消"
    >
        <a-form
        :form="form"
        @submit="handleSubmit"
        >
        <a-form-item
            label="名称"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
        >
            <a-input
            v-decorator="[
                'title',
                {
                    rules: [{ required: true, message: '请输入图片名称!' }],
                    initialValue: rowData.tit
                }
            ]"
            />
        </a-form-item>
        <a-form-item
            label="标签"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
        >
            <a-checkbox-group
            :options="tags"
            v-decorator="[
                'label',
                {
                    rules: [{ required: true, message: '请输入图片标签!' }],
                    initialValue: rowData.label || [],
                },
            ]"
            />
        </a-form-item>
        <a-form-item
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            label="上传图片"
        >
            <div class="dropbox">
            <a-upload-dragger
                v-decorator="['bannerImg', {
                valuePropName: 'fileList',
                rules: [{ required: bannerModelType === 'edit' ? false : true, message: '请上传图片!' }],
                getValueFromEvent: normFile,
                }]"
                name="file"
                action="/api/v0/files/uploadSingle"
                :data="{source: 'banner'}"
            >
                <template v-if="rowData.imgUrl">
                    <img :src="rowData.imgUrl" style="width: 80%" />
                </template>
                <template v-else>
                    <p class="ant-upload-drag-icon">
                    <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">
                    将文件拖拽到这个位置
                    </p>
                </template>
            </a-upload-dragger>
            </div>
        </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BannerManageModal extends Vue {
  @Prop({ default: false })
  visible!: boolean;

  @Prop({ default: 'add' })
  bannerModelType: string;

  @Prop({ default: null })
  rowData: any;

  @Prop({ default: function() {} })
  onSubmit: any;

  @Prop({ default: function() {} })
  onCancel: any;

  public name: string = 'bannerManage';

  public fileList: object[] = this.rowData ? [{uid: this.rowData.id, name: this.rowData.tit, status: 'done', url: this.rowData.imgUrl}] : [{}];

  get tags(): string {
      let labelArr = this.$store.state.config.header.columns;
      return labelArr.map(item => ({label: item, value: item}))
  }

  public form: any;

  public beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  public normFile(e: any) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
        return e && e.fileList;
  }

  public handleCancel(isAdd: boolean) {
      this.onCancel();
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
        if (!err) {
            console.log('Received values of form: ', values);
            this.onSubmit(values);
        }
    });
  }
}
</script>

<style lang="less" scoped>

</style>


