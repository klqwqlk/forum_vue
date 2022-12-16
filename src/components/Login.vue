<template>
  <div>
    <div class="outer">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="user.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="login">登录</el-button></el-form-item
        >
      </el-form>
      <div class="unlogin">
        <router-link :to="{ path: '/forgetpwd' }"> 忘记密码? </router-link>
        |
        <router-link :to="{ path: '/register' }">
          <a href="register.vue" target="_blank" align="right">注册</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  name: 'Login',
  data() {
    return {
      user: {
        userId: '',
        password: ''
      },
      from: ''
    }

  },
  methods: {
    login() {
      request({
        method: 'post',
        url: '/forum/user/login',
        data: this.user
      }).then(response => {
        console.log("login.vue -- response")
        console.log(response.data)
        alert(response);
        if (response == null || response == "") {
          //login failure
        } else {
          var storage = window.localStorage;
          storage.setItem("AuthToken", response.data.data.token);    //调用setItem方法，存储数据
          alert(storage.getItem("AuthToken"));     //调用getItem方法，弹框显示
          storage.setItem("user", JSON.stringify(response.data.data));
          this.$router.push('/Ground');
        }
      }).catch(error => {

        console.log("Login.vue -- login error!" + error)
      })

    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.outer {
  width: 300px;
  margin: 200px auto;
  text-align: center;
}
</style>