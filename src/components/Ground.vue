<template>
  <div>
    <el-header style="background-color: rgb(238, 241, 246)">
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="50"></el-avatar>
            </div>
          </div>
        </el-col>

        <el-col :span="4"
          ><el-link href="https://element.eleme.io" target="_blank"
            >默认链接</el-link
          ></el-col
        >
        <el-col :span="4"
          ><el-link href="https://element.eleme.io" target="_blank"
            >默认链接</el-link
          ></el-col
        >
        <el-col :span="4">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar shape="square" :size="50"></el-avatar>
            </div>
          </div>
        </el-col> </el-row
    ></el-header>
    <el-container style="height: 640px; border: 1px solid #eee">
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 225)">
        </el-aside>
        <!-- <button @click="switchAsideShow">aa</button> -->
        <el-main style="background-color: rgb(238, 241, 246)">
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from './Main.vue'

export default {
  name: "Ground",
  data() {
    return {
      asideWidth: 200
    };
  },
  methods: {
    switchAsideShow() {
      if (this.asideWidth == 200) {
        this.asideWidth = 20;
      }
      else {
        this.asideWidth = 200;
      }
      console.log(this.asideWidth);
    }
  },
  components: { Main }
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
</style>
