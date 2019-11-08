<template>
  <div>
    <p>
      账号：
      <input type="text" placeholder="输入账号" v-model="username" />
    </p>
    <p class="p">
      密码：
      <input placeholder="输入密码" v-model="password" />
    </p>
    <button @click="register">注册</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    register() {
      if (this.username === "") {
        alert("账号不能空");
        return;
      }
      if (this.password === "") {
        alert("账号不能空");
        return;
      }
      axios({
        url: "/register",
        data: {
          username: this.username,
          password: this.password
        },
        method: "post"
      }).then(res => {
        if (res.data.code === 200) {
          alert(res.data.message);
          this.$router.push("/index/home");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
input {
  border: 1px solid #000;
}
button {
  width: 75%;
  height: 45px;
  background: rgb(238, 138, 56);
  margin-top: 20px;
  border: none;
}
</style>