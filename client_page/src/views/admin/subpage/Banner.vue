<template>
  <div class="index-wrap">
    <div class="header-cate-wrap">
        <a-row class="mt-30">
            <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">banner图:</a-col>
            <a-col :span="18">
              <div>
                <a-radio-group :value="bannerConfig.type" buttonStyle="solid" size="small" @change="onBannerTypeClick">
                  <a-radio-button value="0">单图背景+标签云</a-radio-button>
                  <a-radio-button value="1">多图轮播</a-radio-button>
                </a-radio-group>
              </div>
              <div v-if="bannerConfig.type === '0'" class="mt-30">
                <a-row>
                  <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">标签云:</a-col>
                  <a-col :span="18">
                      <template v-for="tag in bannerConfig.label">
                      <a-tag :key="tag" :closable="true" :afterClose="() => handleClose(tag)" color="#108ee9" class="column-tag mb-10">
                          {{tag}}
                      </a-tag>
                      </template>
                      <a-input
                      v-if="inputVisible"
                      ref="input"
                      type="text"
                      size="small"
                      :style="{ width: '78px' }"
                      :value="inputValue"
                      @change="handleInputChange"
                      @blur="handleInputConfirm"
                      @keyup.enter="handleInputConfirm"
                      />
                      <a-tag v-else @click="showInput" color="#87d068" class="column-tag">
                      <a-icon type="plus" /> 添加标签
                      </a-tag>
                  </a-col>
                </a-row>
                <a-row class="mt-30">
                  <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">背景图:</a-col>
                  <a-col :span="18">
                      <upload
                          action="/api/v0/files/uploadSingle"
                          :defaultValue="bannerConfig.bgUrl"
                          :onFileDel="onFileDel"
                          :onFileChange="onFileChange"
                          :data="uploadData"
                          >
                      </upload>
                  </a-col>
                </a-row> 
              </div>
              <div v-else class="mt-30">
                <div class="mb-20"><a-button type="primary" size="small" @click="showModal">添加</a-button></div>
                <a-table :columns="columns" :dataSource="bannerConfig.bannerList" :pagination="isShowPagination" rowKey="id">
                    <span slot="id"></span>
                    <span slot="tit" slot-scope="tit">{{tit}}</span>
                    <span slot="customTitle">名称</span>
                    <span slot="imgUrl" slot-scope="imgUrl"><span class="text-overflow-20" :title="imgUrl">{{imgUrl}}</span></span>
                    <span slot="label" slot-scope="label">
                      <a-tag color="blue" v-for="(item,index) in label" :key="index">{{item}}</a-tag>
                    </span>
                    <span slot="action" slot-scope="rowData">
                        <a @click="editData(rowData)">编辑</a>
                        <a-divider type="vertical" />
                        <a @click="deleteData(rowData)">删除</a>
                    </span>
                </a-table>
              </div>
            </a-col>
        </a-row>
        <a-row class="mt-30">
          <a-col :xs="{ span: 5 }" :lg="{ span: 2 }" class="column-tit"></a-col>
          <a-col :span="18">
            <a-button
                type="primary"
                @click="saveBanner"
            >保存</a-button>
          </a-col>
        </a-row>
        <template v-if="visible">
          <manage-banner-modal
            :bannerModelType="bannerModelType"
            :rowData="rowData"
            :visible="true"
            :onSubmit="handleSubmit"
            :onCancel="handleCloseModal"
          >
          </manage-banner-modal>
        </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import ManageBannerModal from '@/components/ManageBannerModal.vue';
import Upload from '@/components/Upload.vue';
import { Modal } from 'ant-design-vue';

@Component({
  components: {
    ManageBannerModal, Upload
  }
})
export default class Banner extends Vue {
  public isShowPagination: boolean = false;

  public inputVisible: boolean = false;

  public bannerModelType: string = '';

  public uploadData: object = {
    source: 'banner'
  }

  public rowData: any = null;

  public inputValue: string = '';

  public visible: boolean = false;

  public columns = [
    {
        dataIndex: 'id',
        key: 'id',
        title: '编号',
    },
    {
        dataIndex: 'tit',
        key: 'tit',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'tit' },
    },
    {
        title: '图片',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        scopedSlots: { customRender: 'imgUrl' },
    },
    {
        title: '标签',
        key: 'label',
        dataIndex: 'label',
        scopedSlots: { customRender: 'label' },
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
  ];

  public form: any;

  get bannerConfig(): any {
    return this.$store.state.config.banner
  }

  public onBannerTypeClick(e:any) {
    this.$store.commit('setBannerType', e.target.value)
  }

  // 处理图片
  public onFileDel(file: any) {
    this.$store.commit('setBannerBg', '')
  }

  public onFileChange(fileUrl: string) {
    this.$store.commit('setBannerBg', fileUrl)
    this.$message.success('图片自动保存成功')
  }

  public handleClose(removedTag: string) {
      this.$store.commit('delBannerLabel', removedTag);
  }

  public showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
    (this.$refs.input as any).focus()
    });
  }

  public handleInputChange(e: any) {
    this.inputValue = e.target.value;
  }

  public handleInputConfirm() {
    let inputValue = this.inputValue;
    if (inputValue && this.bannerConfig.label.indexOf(inputValue) === -1) {
        this.$store.commit('addBannerLabel', inputValue);
    }
    Object.assign(this, {
        inputVisible: false,
        inputValue: '',
    });
  }

  public showModal() {
      this.visible = true;
      this.rowData = {};
      this.bannerModelType = 'add';
  }

  public handleCloseModal() {
      this.visible = false;
      this.rowData = {};
  }

  public handleSubmit(value: any) {
    let len = this.bannerConfig.bannerList.length;
    if(this.bannerModelType === 'add') {
      this.$store.commit('addBanner', {
        id: 'H000' + (len + 1),
        tit: value.title,
        label: value.label,
        imgUrl: value.bannerImg[0].response.url
      })
    }else {
      let index = +this.rowData.id.slice(-1);
      this.$store.commit('editBanner', {
        id: value.id,
        tit: value.title || this.rowData.title,
        label: value.label || this.rowData.label,
        imgUrl: value.bannerImg && value.bannerImg[0].response ? value.bannerImg[0].response.url : this.rowData.imgUrl
      })
    }
    
    this.visible = false;
  }

  public editData(row: any) {
    this.visible = true;
    this.rowData = row;
    this.bannerModelType = 'edit';
  }

  public saveBanner():void {
    this.$store.dispatch('saveBanner', this.$store.state.config.banner)
  }

  public deleteData(row: any) {
      let _this = this;
      Modal.confirm({
        title: '提示',
        content: '确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$store.commit('delBanner', +row.id.slice(-1) - 1)
          this.saveBanner() 
        }
      });
  }
}
</script>

<style lang="less" scoped>

</style>

