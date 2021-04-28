<template>
  <div class="main login-page">
    <div class="logo-pic">just for fun</div>
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <a-row class="login-page-title">登录账户</a-row>
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账户:没校验"
          v-decorator="['username', { rules: [{ required: true, message: '请输入账户' }], validateTrigger: 'blur' }]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码:没校验"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item class="btn-wrap">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        loginBtn: false
      }
    }
  },
  created() {},
  methods: {
    ...mapActions(['Login', 'Logout']),

    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = {
            account: values.username,
            password: md5(values.password),
            skipKaptcha: true
          }
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },

    loginSuccess(res) {
      this.$router.replace('/')
      this.$setState({ storeInfo: res })
    },
    requestFailed(err) {}
  }
}
</script>

<style lang="less">
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('./img/login_bg.jpg') center center / 100% 100% no-repeat no-repeat;
  .user-layout-login {
    width: 476px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 0 35px 20px;

    .btn-wrap {
      padding-top: 34px;
    }

    button.login-button {
      font-size: 20px;
      height: 52px;
      width: 100%;
    }
  }
  .logo-pic {
    position: fixed;
    top: 22px;
    left: 56px;
    font-size: 30px;
    color: #fff;
    padding-left: 99px;
    background: url('~@/assets/images/logo.png') no-repeat 0;
  }
  .login-page-title {
    text-align: center;
    padding: 30px 0 20px;
    font-size: 32px;
    color: #3569e8;
    font-weight: 700;
  }
}
</style>
