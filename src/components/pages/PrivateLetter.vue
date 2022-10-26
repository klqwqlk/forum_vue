<template>
  <div class="body">
    <div class="header">
      <span>私信</span>
      <b v-if="letter_people != null">{{ letter_people.userName }}</b>
    </div>
    <el-container>
      <el-container>
        <el-aside style="background-color: white" width="200px">
          <Aside_Private_Letter
            @getLetterPeopleFromAside="getLetterPeopleFromChildren($event)"
          ></Aside_Private_Letter>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside_Private_Letter from '../Aside_Private_Letter.vue';

export default {
  data() {
    return {
      letter_people: {}
    };
  },
  methods: {
    //在子组件(Aside_Private_Letter)上接收子组件传的值
    async getLetterPeopleFromChildren(item) {
      console.log(item.userName)
      this.letter_people = item;
    }
  },
  components: { Aside_Private_Letter }
};
</script>

<style scoped>
/* .tag :only-child {
  margin-top: 5px;
  margin-left: 5px;
} */

.body {
  position: relative;
}
.header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.header :first-child {
  position: absolute;
  left: 1%;
}
.el-aside {
  height: 100%;
  background-color: #ccc;
}
.el-main {
  height: 550px;
  background-color: white;
}
</style>
