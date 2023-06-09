<template>
  <div class="login-wrap">                   
      <div class="ms-login">
          <div class="ms-title">管理员登录系统</div>            
          <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
              <el-form-item prop="username">
                  <el-input v-model="param.username" placeholder="username">
                      <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                  </el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input
                      type="password"
                      placeholder="password"
                      v-model="param.password"
                      @keyup.enter.native="submitForm()"
                  >
                      <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                  </el-input>
              </el-form-item>
              <div class="login-btn">
                  <el-button type="primary" @click="submitForm()">登录</el-button>
              </div>
              <p class="login-tips">Tips : 没有账号请先注册</p>
          </el-form>
                  <div class="register-btn">
                     没有账户?<el-button size="medium" type="text" @click="registerForm()">注册</el-button>
                  </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'login',
  data: function() {
      return {
          param: {
              username: '',
              password: '',
              returnarr: [],
          },
          rules: {
              username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
              password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          },
      };
  },
  methods: {
      submitForm() {
          this.$refs.login.validate(valid => {
              if (valid) {
                  this.sendData();
                  // this.$message.success('登录成功');
                  // localStorage.setItem('ms_username', this.param.username);
                  // this.$router.push('/');
              } else {
                  this.$message.error('请输入账号和密码');
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      sendData(){
          var that=this;
          //传输数据到后端
          axios.post('http://114.55.37.219:8081/login', {
            adminName: that.param.username,
            adminPwd: that.param.password,
              }).then(function (response) {
              console.log(response);
              that.param.returnarr[0] = response.data;
              console.log(that.param.returnarr[0]);
              that.judgeData();
              }).catch(function (error) {
              console.log(error);
          });
      },
      registerForm(){
          //  this.$refs.login.validate(valid => {
          //     if (valid) {
          //         this.$message.success('注册成功');
          //         localStorage.setItem('ms_username', this.param.username);
                 this.$router.push('./register');
          //     } else {
          //         this.$message.error('请输入账号和密码');
          //         console.log('error submit!!');
          //         return false;
          //     }
          // });
      },
      judgeData(){
          var that=this;
          if(this.param.returnarr[0].msg == "登陆失败"){
              this.$message({
                  message: '密码或账户错误,请重新输入！',
                  type: 'warning',
                  showClose: true
                  });
          }else if(this.param.returnarr[0].code == 200){
              this.$message.success('登录成功');
              localStorage.setItem('ms_username', this.param.username);
              localStorage.setItem('ms_token', this.param.returnarr[0].data.token);
              console.log(localStorage.getItem('ms_token'));
              that.$router.push('/');
          }
      },
      }
  
};

</script>

<style scoped>

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/BGN.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.register-btn {
  text-align: center;
}

</style>