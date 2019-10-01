<template>
  <div class="index-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">文章列表:</a-col>
            <a-col :span="18">
                <div class="mb-20"><router-link to="/addArticle"><a-button type="primary">添加</a-button></router-link></div>
                <a-table :columns="columns" :dataSource="articles" :pagination="isShowPagination" rowKey="tit">
                    <span slot="tit" slot-scope="text">{{text}}</span>
                    <span slot="customTitle">标题</span>
                    <span slot="faceUrl" slot-scope="faceUrl"><span class="text-overflow-20" :title="faceUrl">{{faceUrl}}</span></span>
                    <span slot="label" slot-scope="label">
                      <a-tag color="blue" :key="label">{{ label }}</a-tag>
                    </span>
                    <span slot="action" slot-scope="rowData">
                        <a @click="editArticle(rowData)">编辑</a>
                        <a-divider type="vertical" />
                        <a @click="delArticle(rowData)">删除</a>
                    </span>
                </a-table>
            </a-col>
        </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import http from '../../utils/http';
import { Modal } from 'ant-design-vue';

@Component
export default class Article extends Vue {
  public name: string = 'article';

  public isShowPagination: boolean = false;

  public columns = [
    {
        dataIndex: 'tit',
        key: 'tit',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'tit' },
    },
    {
        title: '首图图片',
        dataIndex: 'faceUrl',
        key: 'faceUrl',
        scopedSlots: { customRender: 'faceUrl' },
    },
    {
        title: '文章分类',
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

  get articles(): object[] {
    return this.$store.state.articleList
  };

  public created(): void {
    
  }

  public editArticle(row) {
    this.$router.push({path: '/addArticle', query: { id: row.id, label: row.label }});
  }

  public delArticle(row) {
    Modal.confirm({
      title: '提示',
      content: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.$store.dispatch('delArticle', { id: row.id, label: row.label })
      }
    });
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

<style lang="less" scoped>

</style>

