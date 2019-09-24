<template>
    <div>
        <a-upload
            :action="action"
            listType="picture-card"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange"
            :remove="delFile"
            :data="data"
            >
            <template v-if="!fileList.length && defaultValue">
                <img :src="defaultValue" alt="" style="width: 100%">
            </template>
            <template v-else>
                <div v-if="fileList.length < 2">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">上传</div>
                </div>
            </template>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>   
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Upload extends Vue {
  @Prop({ default: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
  action!: string;

  @Prop()
  defaultValue: string;

  @Prop()
  data: object;

  @Prop({ default: function() {} })
  onFileDel: any;

  @Prop({ default: function() {} })
  onFileChange: any;

  public previewVisible: boolean =  false;
  public previewImage: string =  '';
  public fileList: object[] = [];

  // 处理图片
  public handlePreview(file: any) {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  public delFile(file: any) {
    this.fileList = [];
    this.onFileDel();
  }

  public handleChange({ file }: any) {
    this.fileList = [file];
    console.log(file.status, file.response)
    if(file.status === 'done') {
      this.onFileChange(file.response.url);
    } else if(file.status === 'error') {
      this.$message.error(file.response.msg)
    }
  }

  public handleCancel() {
      this.previewVisible = false;
  }
}
</script>


