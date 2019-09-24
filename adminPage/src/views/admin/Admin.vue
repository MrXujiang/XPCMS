<template>
  <div class="index-wrap">
    <div class="header-cate-wrap">
        <a-row>
            <a-col :xs="{ span: 4 }" :lg="{ span: 2 }" class="column-tit">管理员列表:</a-col>
            <a-col :span="18">
                <div class="mb-20"><a-button type="primary" @click="showAddModal">添加</a-button></div>
                <a-table :columns="columns" :dataSource="admins" :pagination="isShowPagination" rowKey="username">
                    <span slot="username" slot-scope="text">{{text}}</span>
                    <span slot="customTitle">名称</span>
                    <span slot="role" slot-scope="role"><span class="text-overflow-20" :title="role">{{+role ? '普通管理员' : '超级管理员'}}</span></span>
                    <span slot="action" slot-scope="rowData">
                        <a @click="editAdmin(rowData)">编辑</a>
                        <a-divider type="vertical" />
                        <a @click="delAdmin(rowData)">删除</a>
                    </span>
                </a-table>
            </a-col>
        </a-row>
        <admin-modal
          :modalType="modalType"
          :visible="isShowModal"
          :rowData="rowData"
          :onSubmit="handleSubmit"
          :onCancel="closeModal"
        ></admin-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Modal } from 'ant-design-vue';
import AdminModal from '@/components/AdminModal';

interface UserData {
  [propName: string]: string;
}

@Component({
  components: { AdminModal }
})
export default class Article extends Vue {
  public name: string = 'admin';

  public isShowModal: boolean = false;

  public modalType: string = 'add'

  public rowData: UserData = {};

  public isShowPagination: boolean = false;

  public columns = [
    {
        dataIndex: 'username',
        key: 'username',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'username' },
    },
    {
        title: '权限',
        key: 'role',
        dataIndex: 'role',
        scopedSlots: { customRender: 'role' },
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
  ];

  get admins(): object[] {
    return this.$store.state.admins
  };

  public created(): void {
    this.$store.dispatch('getAdmins');
  }

  public showAddModal(): void {
    this.isShowModal = true
    this.rowData = {}
  }

  public editAdmin(row) {
    this.rowData = row
    this.modalType = 'edit'
    this.isShowModal = true
  }

  public handleSubmit(values) {
    if(this.modalType === 'edit') {
      this.$store.dispatch('editAdmin', {...values, prevName: this.rowData.username}).finally(() => {
        this.isShowModal = false
      })
    }else {
      this.$store.dispatch('addAdmin', values).finally(() => {
        this.isShowModal = false
      })
    }
  }

  public closeModal() {
    this.isShowModal = false
  }

  public delAdmin(row) {
    Modal.confirm({
      title: '提示',
      content: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.$store.dispatch('delAdmin', row.username)
      }
    });
  }
}
</script>

<style lang="less" scoped>

</style>

