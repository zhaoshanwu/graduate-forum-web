<template>
  <div id="front_login_container" class="front_login_container">
    <el-container>
        <el-header>
          <el-row :gutter="24">
            <el-col :span="4" :offset="3">
              <div class="img">

              </div>
            </el-col>
            <el-col :span="3" :offset="13">
              <div class="home">

              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="h100"></div>
          <div class="login_frame">
            <el-tabs v-model="activeName">
              <el-tab-pane label="登录" name="first">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="账号：" >
                      <el-input v-model="form.logIn.userNumber" @blur="checkLogInNumber()"></el-input>
                    </el-form-item>
                    <p class="warn">{{numberWarn}}</p>
                    <el-form-item label="密码：">
                      <el-input v-model="form.logIn.userPassword" @blur="checkLogInPassword()"></el-input>
                    </el-form-item>
                    <p class="warn">{{passwordWarn}}</p>
                    <el-form-item>
                      <el-button type="primary" @click="logIn()">登录</el-button>
                    </el-form-item>
                  </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="昵称：">
                    <el-input v-model="form.signIn.userName" @blur="checkSignInName()"></el-input>
                  </el-form-item>
                  <p class="warn">{{nameWarn}}</p>
                  <el-form-item label="账号：">
                    <el-input v-model="form.signIn.userNumber" @blur="checkSignInNumber()"></el-input>
                  </el-form-item>
                  <p class="warn">{{numberWarn}}</p>
                  <el-form-item label="密码：">
                    <el-input v-model="form.signIn.userPassword" @blur="checkSignInPassword()"></el-input>
                  </el-form-item>
                  <p class="warn">{{passwordWarn}}</p>
                  <el-form-item>
                    <el-button type="primary" @click="signIn()">注册</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs> 
          </div>
          <div class="h120"></div>
        </el-main>
        <el-footer style="height: 131px">
          <footer></footer>
        </el-footer>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import bottom from '../../components/Bottom'

  export default {
    components: {
      bottom
    },
    data() {
      return {
        activeName: 'first',
        form: {
          logIn: {
            userNumber: 'wen',
            userPassword: 'wen',
            userName: ''
          },
          signIn: {
            userNumber: '',
            userPassword: '',
            userName: ''
          },
        },
        numberWarn: '请输入账号',
        passwordWarn: '请输入密码',
        nameWarn: '请输入昵称',
      };
    },
    methods: {
      checkLogInNumber() {
        let number = this.form.logIn.userNumber;
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
        let password = this.form.logIn.userPassword;
        let passwordRegular = /^[A-Za-z0-9]{3,12}$/;
        if (password == '') {
          this.passwordWarn = '密码不能为空';
        } else if(passwordRegular.test(password)) {
          this.passwordWarn = '输入正确';
        } else {
          this.passwordWarn = '输入错误！！ 请输入4~12位纯字母';
        }
      },
      checkSignInName() {
        let name = this.form.signIn.userName;
        let nameRegular = /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/;
        if (name == '') {
          this.nameWarn = '昵称不能为空';
          return false;
        } else if(nameRegular.test(name)) {
          this.nameWarn = '输入正确';
          return true;
        } else {
          this.nameWarn = '输入错误！！ 请输入4~12位字母数字或汉字';
          return false;
        }
      },
      checkSignInNumber() {
        let number = this.form.signIn.userNumber;
        let numberRegular = /^[a-zA-Z]{3,12}$/;
        if (number == '') {
          this.numberWarn = '账号不能为空';
        } else if(numberRegular.test(number)) {
          this.numberWarn = '输入正确';
        } else {
          this.numberWarn = '输入错误！！ 请输入4~12位纯字母';
        }
      },
      checkSignInPassword() {
        let password = this.form.signIn.userPassword;
        let passwordRegular = /^[A-Za-z0-9]{3,12}$/;
        if (password == '') {
          this.passwordWarn = '密码不能为空';
        } else if(passwordRegular.test(password)) {
          this.passwordWarn = '输入正确';
        } else {
          this.passwordWarn = '输入错误！！ 请输入4~12位纯字母';
        }
      },
      logIn() {
        const _this = this;

        let number = this.form.logIn.userNumber;
        let password = this.form.logIn.userPassword;
        let numberRegular = /^[a-zA-Z]{3,12}$/;
        let passwordRegular = /^[A-Za-z0-9]{3,12}$/;
        if (numberRegular.test(number) && passwordRegular.test(password)) {
          axios.get('user/get/by/number/password', {
            params: {
              userNumber: number,
              userPassword: password
            }
          })
          .then(function (respanse) {
            const user = respanse.data;

            if (respanse.data.userId != undefined) {
              window.sessionStorage.setItem("userId", user.userId);
              _this.$router.push({path:'/front_home'}).catch(err=>err);;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      },
      signIn() {
        const _this = this;

        let number = _this.form.signIn.userNumber;
        let password = _this.form.signIn.userPassword;
        let name = _this.form.signIn.userName;
        let numberRegular = /^[a-zA-Z]{3,12}$/;
        let passwordRegular = /^[A-Za-z0-9]{3,12}$/;
        let nameRegular = /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/;

        if (numberRegular.test(number) && passwordRegular.test(password) && nameRegular.test(name)) {
          axios.get('user/post/user', {
            params: {
              userNumber: number,
              userPassword: password,
              userName: name
            }
          })
          .then(function (respanse) {
            alert('注册成功');
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../../assets/css/Login/Login.css';

  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-footer {
    height: 200px;
  }

  .el-main {
    height: 100%;
    background-color: pink;
    color: #333;
    line-height: 60px;
  }

  .el-row {
    height: 100%;
    margin-bottom: 20px;
    &:last-child {
    margin-bottom: 0;
    }
  }

  .el-col {
    height: 100%;
    border-radius: 4px;
  }
</style>
