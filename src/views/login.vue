<template>
  <div class="login">
    <h3>登陆</h3>
    <p>
      账号：
      <input type="text" placeholder="输入账号" v-model="username" />
    </p>
    <p class="p">
      密码：
      <input :type="flag?'password':'text'" placeholder="输入密码" v-model="password" />
      <span
        @click="changeflag"
        class="iconfont"
        :class="  flag?'icon-xiugaimimaxiaoyanjing':'icon-xiaoyanjing-bi'"
      ></span>
    </p>
    <button @click="mylogin">登陆</button>
     <button @click="register">注册</button>
  </div>
</template>
<script>
import api from '../api/index'
export default {
  data() {
    return {
      username: "admin",
      password: "123456",
      flag: false
    };
  },
  methods: {
    mylogin() {
      if (this.username === "") {
        alert("账号不能空");
        return;
      }
      if (this.password === "") {
        alert("账号不能空");
        return;
      }
      // axios({
      //     url:"/islogin",
      //     data:{
      //         username:this.username,
      //         password:this.password
      //     },
      //     method:'post'
      // })
      api.myLogin({
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.code === 200) {
            this.$router.push("/index");
          }
        });
    },
    changeflag() {
      this.flag = !this.flag;
    },
    register(){
      this.$router.push('/register')
    }
  }
};
</script>
<style lang='scss' scoped>
.login {
  text-align: center;
}
button {
  width: 75%;
  height: 45px;
  background: rgb(238, 138, 56);
margin-top: 20px;
  border: none;
}
h3 {
  text-align: center;
}
input {
  border: 1px solid #000;
}
</style>