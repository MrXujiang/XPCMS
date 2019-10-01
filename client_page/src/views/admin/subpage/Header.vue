<template>
  <div class="index-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 5 }" :lg="{ span: 2 }" class="column-tit">分类栏目:</a-col>
            <a-col :span="18">
                <template v-for="(tag, index) in headerConfig.columns">
                <a-tag :key="tag" :closable="index > 1" :afterClose="() => handleClose(tag)" color="#108ee9" class="column-tag">
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
        <a-row>
          <a-col :xs="{ span: 5 }" :lg="{ span: 2 }" class="column-tit">栏目高度:</a-col>
          <a-col :span="18">
            <a-input-number :min="40" :max="100" :value="headerConfig.height" @change="onChangeHeight" />
          </a-col>
        </a-row>
        <!-- 颜色 -->
        <a-row>
          <a-col :xs="{ span: 5 }" :lg="{ span: 2 }" class="column-tit">栏目背景:</a-col>
          <a-col :span="18">
            <input type="color" :value="headerConfig.backgroundColor" @change="onChangeColor" />
            <div class="color-wrap">当前颜色：<span class="cur-color" :style="{backgroundColor: headerConfig.backgroundColor}"></span></div>
          </a-col>
        </a-row>
        <!-- logo -->
        <a-row>
          <a-col :xs="{ span: 5 }" :lg="{ span: 2 }" class="column-tit">网站logo:</a-col>
          <a-col :span="18">
            <upload
                action="/api/v0/files/uploadSingle"
                :onFileDel="onFileDel"
                :onFileChange="onFileChange"
                :defaultValue="headerConfig.logo"
                :data="uploadData"
                >
            </upload>
          </a-col>
        </a-row>
        <a-row class="mt-30">
          <a-col :xs="{ span: 5 }" :lg="{ span: 2 }" class="column-tit"></a-col>
          <a-col :span="18">
            <a-button
                type="primary"
                @click="saveHeader"
            >保存</a-button>
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
export default class Home extends Vue {
  public name: string = 'index';

  public uploadData: object = {
    source: 'header'
  }

  public inputVisible: boolean = false;

  public inputValue: string = '';

  public handleClose(removedTag: string) {
      this.$store.commit('delColumn', removedTag);
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

  public onChangeHeight(value: number) {
    this.$store.commit('setColumnHeight', value);
  }

  public onChangeColor(e: any) {
    this.$store.commit('setColumnBgColor', e.target.value)
  }

  public onFileDel(file: any) {
    this.$store.commit('setLogo', '')
  }

  public onFileChange(fileUrl: string) {
    this.$store.commit('setLogo', fileUrl)
  }

  public handleInputConfirm() {
    const inputValue = this.inputValue;
    let tags = this.headerConfig.columns;
    if (inputValue && tags.indexOf(inputValue) === -1) {
        this.$store.commit('addColumn', inputValue);
    }
    Object.assign(this, {
        inputVisible: false,
        inputValue: '',
    });
  }

  public saveHeader() {
    this.$store.dispatch('saveHeader', this.$store.state.config.header)
  }

  get headerConfig(): any {
    return this.$store.state.config.header
  }
}
</script>

<style lang="less" scoped>
    .column-tit {
      padding-bottom: 36px;
      font-size: 16px;
    }

    .column-tag {
      font-size: 16px;
      height: 1.8em;
      line-height: 1.8em;
    }

    .color-wrap {
      display: inline-block;
      margin-left: 20px;
      .cur-color {
        margin-left: 10px;
        display: inline-block;
        width: 40px;
        height: 20px;
        border: 1px solid #f0f0f0;
        vertical-align: middle;
      }
    }

</style>

