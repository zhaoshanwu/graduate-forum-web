<template>
  <div id="admin_login_container" class="admin_login_container">
    <div class="w100" />
    <div class="main">
      <div class="title">
        <span>诗词论坛后台管理系统</span>
      </div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item prop="number">
          <i class="el-icon-user-solid icon"></i>
          <el-input
            type="text"
            v-model="form.number"
            @blur="checkLogInNumber()"
          ></el-input>
        </el-form-item>
        <span class="warn">{{ numberWarn }}</span>
        <el-form-item prop="password">
          <i class="el-icon-lock icon"></i>
          <el-input
            type="password"
            v-model="form.password"
            @blur="checkLogInPassword()"
          ></el-input>
        </el-form-item>
        <span class="warn">{{ passwordWarn }}</span>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        number: 'admin',
        password: '0000'
      },
      numberWarn: '请输入用户名',
      passwordWarn: '请输入密码',
      adminId: '',
    }
  },
  methods: {
    checkLogInNumber() {
      let number = this.form.number;
      let numberRegular = /^[a-zA-Z]{3,12}$/;
      if (number == '') {
        this.numberWarn = '账号不能为空';
      } else if(numberRegular.test(number)) {
        this.numberWarn = '输入正确';
      } else {
        this.numberWarn = '输入错误！！ 请输入4~12位纯字母';
      }
    },
    checkLogInPassword() {
      let password = this.form.password;
      let passwordRegular = /^[A-Za-z0-9]{3,12}$/;
      if (password == '') {
        this.passwordWarn = '密码不能为空';
      } else if(passwordRegular.test(password)) {
        this.passwordWarn = '输入正确';
      } else {
        this.passwordWarn = '输入错误！！ 请输入4~12位纯字母';
      }
    },
    login() {
      const _this = this;

      let number = this.form.number;
      let password = this.form.password;
      let numberRegular = /^[a-zA-Z]{3,12}$/;
      let passwordRegular = /^[A-Za-z0-9]{3,12}$/;
      if (numberRegular.test(number) && passwordRegular.test(password)) {
        axios.get('admin/get/number/password', {
          params: {
            adminNumber: number,
            adminPassword: password
          }
        })
        .then(function (respanse) {
          if (respanse.data.adminNumber != undefined) {
            window.sessionStorage.setItem("adminNumber", respanse.data.adminNumber);
            _this.$router.push({path:'/admin_home'}).catch(err=>err);
          } else {
            _this.$message({
              message: '用户名或密码错误',
              type: 'warn'
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/admin/Login.css';

  .admin_login_container {
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
        color: #fff;
        height: 47px;
        caret-color: #fff;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #283443 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
</style>