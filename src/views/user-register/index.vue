<template>
  <div class="user-register">
    <el-form
      ref="registerForm"
      :model="registerModel"
      class="register-form"
      :rules="registerRule"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎注册</h3>
      </div>
      <el-form-item prop="nickName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="nickName"
          v-model="registerModel.nickName"
          placeholder="用户昵称"
          name="nickName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userName"
          v-model="registerModel.userName"
          placeholder="用户名"
          name="userName"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="registerModel.password"
          placeholder="密码"
          name="password"
          type="password"
          tabindex="4"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="repassword"
          v-model="registerModel.repassword"
          placeholder="请重新输入密码"
          name="rePassword"
          type="password"
          tabindex="5"
          auto-complete="on"
        />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { userRegister } from '@api/user-service'
import { mapState } from 'vuex'

let passwordCache = ''
export default {
  name: 'UserRegister',
  data() {
    const passwordValidate = (rule, value, callback) => {
      passwordCache = value
      if (value.length < 6) {
        callback(new Error('密码不小于6位'))
      } else {
        callback()
      }
    }
    const repasswordValidate = (rule, value, callback) => {
      if (passwordCache !== value) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerModel: {
        userName: '',
        mail: '',
        nickName: '',
        password: '',
        repassword: ''
      },
      loading: false,
      registerRule: {
        userName: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { trigger: ['blur', 'change'], type: 'email', message: '用户必须是一个邮箱' }
        ],
        nickName: [{ required: true, trigger: 'blur', message: '请输入昵称' }],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { trigger: ['blur'], type: 'string', message: '请输入正确的密码' },
          { trigger: ['blur'], type: 'string', message: '请输入正确的密码', validator: passwordValidate }
        ],
        repassword: [
          { required: true, trigger: 'blur', message: '请重新输入密码' },
          { trigger: ['blur'], type: 'string', validator: repasswordValidate }
        ]
      }

    }
  },
  computed: {
    ...mapState('image', {
      previewPictures: s => s.previewPictures
    })
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          const userInfo = this.registerModel
          userInfo.mail = userInfo.userName
          userInfo.avatar = 'https://avatars1.githubusercontent.com/u/15714962?s=460&u=b6eec1ca20669684cf673fd36d12247ddce2fc15&v=4'
          delete userInfo.repassword
          this.loading = true
          try {
            await userRegister(userInfo)
            this.$notify({
              message: '用户注册成功，请进入邮箱激活',
              type: 'success'
            })
            this.loading = false
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)
          } catch (e) {
            this.$message.error(e.toString())
            this.loading = false
          }
        } else {
          return false
        }
      })
    },
    handleCropper(images) {
      if (images && images.length > 0) {
        const image = images[0]
        this.registerModel.avatarUrl = image.url
      }
    }
  }

}
</script>
<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .user-register input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .user-register {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .el-upload-dragger{
      background-color: transparent;
    }
  }
</style>

<style scoped lang="scss">
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $cursor: #fff;
  .avatar-item{
    text-align: center;
  }
  .user-register {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
