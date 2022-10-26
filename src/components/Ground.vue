<template>
  <div>
    <el-header style="background-color: rgb(238, 241, 246)">
      <el-row class="demo-avatar demo-basic">
        <el-col :span="1">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar shape="square" :size="50"></el-avatar>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          {{ username == "" ? "未登录" : username }}
        </el-col>
        <el-col :span="1">
          <el-switch
            @change="switchAsideShow"
            v-model="asideShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
            >
          </el-switch>
        </el-col>
        <el-col :span="1"
          ><el-link href="https://element.eleme.io" target="_blank"
            >默认链接</el-link
          ></el-col
        >
        <el-col :span="1"
          ><el-link href="https://element.eleme.io" target="_blank"
            >默认链接</el-link
          ></el-col
        >
      </el-row></el-header
    >
    <el-container style="height: 640px; border: 1px solid #eee">
      <el-container>
        <el-aside :width="`${asideWidth}px`" style="background-color: white">
          <Aside></Aside>
        </el-aside>
        <!-- <button @click="switchAsideShow">aa</button> -->
        <el-main style="background-color: rgb(238, 241, 246)">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './Aside.vue';

export default {
  name: "Ground",
  components: {
    Aside
  },
  data() {
    return {
      avater: '',
      username: '',
      asideShow: true,
      asideWidth: 200
    };
  },
  methods: {
    switchAsideShow() {

      if (this.asideShow == true) {
        this.asideWidth = 200;
      }
      else {
        this.asideWidth = 20;

      }
      // console.log(this.asideWidth);


    }
  },
  components: { Aside }
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

.el-main {
  border-left: 2px silver solid;
  padding: 0;
}
</style>
