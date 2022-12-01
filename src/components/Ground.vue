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
        <el-button
          @click="drawer = true"
          type="text"
          style="margin-left: 16px"
        >
          发表动态
        </el-button>
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

    <el-drawer title="发表动态/文章" :visible.sync="drawer" size="50%">
      <div>
        <el-button @click="createDynamic = true">发表动态</el-button><br></br>
        <el-button @click="createArticle = true">发表文章</el-button>
        <el-drawer
          title="动态"
          :append-to-body="true"
          :before-close="handleDynamicClose"
          :visible.sync="createDynamic"
        >
         <el-input
  type="textarea"
  :autosize="{ minRows: 10, maxRows: 30}"
  placeholder="请输入内容"
  maxlength="1000"
  v-model="DynamicContent">
</el-input>
        </el-drawer>
        <el-drawer
          title="文章"
          :append-to-body="true"
          :before-close="handleArticleClose"
          :visible.sync="createArticle"
        >
          <el-input
  type="textarea"
  autosize
  placeholder="请输入标题"
  maxlength="100"
  minlength="1"
  v-model="ArticleTitle">
</el-input>
<div style="margin: 20px 0;"></div>
<el-input
  type="textarea"
  :autosize="{ minRows: 10, maxRows: 30}"
  placeholder="请输入内容"
  maxlength="50000"
  v-model="ArticleContent">
</el-input>
        </el-drawer>
      </div>
    </el-drawer>
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
      asideWidth: 200,
      createArticle: false,
      createDynamic: false,
      drawer: false,
      DynamicContent: '',
      ArticleTitle: '',
      ArticleContent: ''
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


    },
    handleDynamicClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done();
          this.DynamicContent = '';
        })
        .catch(_ => { });
    },
    handleArticleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done();
          this.ArticleTitle = '';
          this.ArticleContent = '';
        })
        .catch(_ => { });
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
