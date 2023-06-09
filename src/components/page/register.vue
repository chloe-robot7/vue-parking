<template>
<div @click.self="container" class="login-wrap">   
  <div  class="rg_layout">
    <div class="rg_left">
        <p>新用户注册</p>
        <p>USER REGISTER</p>

    </div>
    <div  class="rg_center">
        <div class="rg_form">
            <form>
                <table>
                    <tr>
                        <td class="td_left"><label for="username">用户名：</label></td>
                        <td class_right><input ref="username" v-model="param.username" type="text" name="username" placeholder="请输入用户名" id="username" required autocomplete="off"></td>
                    </tr>
                    <tr>
                        <td class="td_left"><label for="password">密码：</label></td>
                        <td class_right><input ref="userPassword" v-model="param.password" type="password" name="userPassword" placeholder="请输入密码" id="password" required autocomplete="off"></td>
                    </tr>
                    <tr>
                        <td class="td_left"><label for="verifyPassword">确认密码：</label></td>
                        <td class_right><input ref="verifyPassword" v-model="param.verifyPassword" type="password" name="verifyPassword" placeholder="请确认密码" id="verifyPassword" required autocomplete="off"></td>
                    </tr>
                    <tr>
                        <td class="td_left"><label for="name">姓名：</label></td>
                        <td class="tb_right"><input ref="Tname"  v-model="param.Tname" type="text" name="Tname" id="name" placeholder="请输入姓名" required autocomplete="off"></td>
                    </tr>
                    <tr>
                        <td class="td_left"><label for="tel">手机号：</label></td>
                        <td class="tb_right"><input ref="tel" v-model="param.tel" type="text" name="lPhoneNumber" id="tel" placeholder="请输入手机号" required autocomplete="off"></td>
                    </tr>
                    <tr>
                        <td colspan="10" align="center"><input @click="submitForm()" type="button" id="sub" value="注册" style="color: aliceblue;"></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
    <div class="rg_right">
        <P>已有帐户?<a @click="loginForm()">立即登录</a></P>
    </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { postRegister } from '../../api/index';
export default {
    name: 'user',
    data() {
        return{
            param:{
                username:'',
                password:'',
                verifyPassword:'',
                tel:'',
                Tname:'',
                returnarr:[], //后端传过来的存储登录user的数组
            },
            rules:{
                username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}],
                verifyPassword:[{required:true,message:'请确认密码',trigger:'blur'}],
                tel:[{required:true,message:'请输入手机号',trigger:'blur'}],
                Tname:[{required:true,message:'请输入姓名',trigger:'blur'}]
            }
        }
    },
    methods:{
        loginForm(){
            this.$router.push('./aLogin');
        },
        submitForm(){
            //判断是否所有输入框都已填写
                    if(this.$refs.username.value == "" || this.$refs.userPassword.value == "" || this.$refs.verifyPassword.value == "" || this.$refs.tel.value == "" || this.$refs.Tname.value == ""){
                        return false;
                    }else{
                        this.sendData()
                    }
        },
        sendData(){
            var that=this;
            //传输数据到后端
            axios.post('http://114.55.37.219:8081/user/register', {
                username: that.param.username,
                password: that.param.password,
                }).then(function (response) {
                console.log(response);
                that.param.returnarr[0] = response.data;
                console.log(that.param.returnarr[0]);
                that.judgeData();
                }).catch(function (error) {
                console.log(error);
            });
            // postRegister(that.param).then(res => {
            //     console.log(res);
            //     that.param.returnarr[0] = res.data;
            //     console.log(that.param.returnarr[0]); 
            //     that.judgeData();
            // });    
        },
        container(){
                    if(this.$refs.userPassword.value != this.$refs.verifyPassword.value){
                        this.$message({
                        message: '两次密码不一致,请重新输入！',
                        type: 'warning',
                        showClose: true
                        });
                        }
        },
        judgeData(){
            if(this.param.returnarr[0].msg == "用户名重复"){
                this.$message({
                    message: '用户名已存在,请重新输入！',
                    type: 'warning',
                    showClose: true
                    });
            }else{
                this.$message.success('注册成功,请返回登录页面！');
                this.$router.push('./login');
            }
        }
  }
}
</script>

<style scoped>
     *{
        margin: 0px;
        padding: 0px;
    }
    .login-wrap{
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/BGN.jpg);
        background-size: 100%;
    }
    /* body{
    } */
    .rg_layout{
        position: absolute;
        width: 700px;
        height: 420px;
        border:1.5px solid #ddd;
        background-color: rgba(255, 255, 255, 0.626);
        margin:auto;
        top: 20%;
        margin-left: 350px;
    }
    .rg_left{

        float: left;
        margin: 15px;
        margin-left: 30px;
    }
    .rg_left > p:first-child{
        color: #FFD026;
        font-size: 24px;
        margin-top:15px;
    }
    .rg_left > p:last-child{
        color: grey;
        font-size: 20px;
    }
    .rg_center{

        float: left;
        margin-top:30px;
        width: 350px;
    }
    .rg_right{
        float: right;
        font-size: 10px;
        margin: 10px;
        padding-left: 50px;
    }

    .rg_right p a{
        color: #fff;
    }
    .td_left{
        width: 100px;
        text-align: right;
        height: 45px;
    }
    
    #username,#password,#birthday,#tel,#name,#verifyPassword{
        width: 251px;
        height: 32px;
        border: grey 1px solid;
        border-radius: 5px;
        padding-left: 10px;
    }
    #sub{
        width: 150px;
        background-color: rgba(3,106,104,0.7);
        height: 40px;
        border:1px solid rgba(3,106,104,0.7);;
        margin-top: 30px;
    }
</style>