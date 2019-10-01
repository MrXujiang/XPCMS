<template>
  <div class="login-wrap">
    <a-form
      id="login_form"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <h1 class="form-tit">众学CMS</h1>
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '请输入用户名!' }] }
          ]"
          placeholder="用户名"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'pwd',
            { rules: [{ required: true, message: '请输入密码!' }] }
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              }
            ]"
          >
            记住账号
          </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          block
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import http from '../utils/http';

@Component
export default class Login extends Vue {
  public name: string = 'xujiang';
  public form: any;

  public beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  public created() {

  }

  public handleSubmit(e: any): void {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        http.post('/admin/loginAdmin', 
        {
          username: values.username,
          pwd: values.pwd
        }).then(res => {
          this.$message.success(res.data, 2, ():void => {
            this.$router.push('/');
          })
        }).catch(err => {
          this.$message.error(err.data)
        })
      }
    });
  }
}
</script>

<style lang="less" scoped>
  .login-wrap {
    position: relative;
    height: 100vh;
    background: #f0f0f0 url(../assets/bg.jpg) no-repeat center center;
    background-size: cover;
    .form-tit {
      text-align: center;
    }

    .login-form {
      position: absolute;
      width: 360px;
      padding: 30px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, .96);
      box-shadow: 2px 2px 10px rgba(0,0,0, .1);
    }
  }
</style>

