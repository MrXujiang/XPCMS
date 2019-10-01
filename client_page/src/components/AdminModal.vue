<template>
    <a-modal
        :title="modalType === 'add' ? '添加管理员' : '修改管理员'"
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
                    'username',
                    {
                        rules: [{ required: true, message: '请输入管理员名称!' }],
                        initialValue: rowData && rowData.username || ''
                    }
                ]"
                placeholder="请输入管理员名称"
                />
            </a-form-item>
            <a-form-item
                label="权限"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-radio-group v-decorator="['role',
                    {
                        rules: [{ required: true, message: '请选择权限!' }],
                        initialValue: rowData && rowData.role+  '' || ''
                    }]">
                    <a-radio value="0">
                        超级管理员
                    </a-radio>
                    <a-radio value="1">
                        管理员
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                label="密码"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-input
                type="password"
                v-decorator="[
                    'pwd',
                    {
                        rules: [{ required: true, message: '请输入密码!' }],
                        initialValue: rowData && rowData.pwd || ''
                    }
                ]"
                placeholder="请输入密码"
                />
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
  modalType: string;

  @Prop({ default: null })
  rowData: any;

  @Prop({ default: function() {} })
  onSubmit: any;

  @Prop({ default: function() {} })
  onCancel: any;

  public form: any;

  public beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  public handleCancel(isAdd: boolean) {
      this.onCancel();
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
        if (!err) {
            this.onSubmit(values);
        }
    });
  }
}
</script>


