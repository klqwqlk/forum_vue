<template>
  <div class="body">
    <div class="header">
      <span>我的收藏</span>
      <!-- <img
        v-if="storage_type != null"
        height="30px"
        :src="letter_people.ava"
      ></img> -->
      <b v-if="storage_type != null && storage_type.name !== ''">{{
        storage_type.name
      }}</b>
    </div>
    <el-container>
      <el-container>
        <el-aside style="background-color: white" width="200px">
          <!--storage_type传递给子组件 Aside_Storage_Menu-->
          <Aside_Storage_Menu
            @getListFromAsideMenuType="getMenuTypeFromChildren($event)"
          ></Aside_Storage_Menu>
        </el-aside>
        <el-main>
          <router-view
            :storage_type="storage_type"
            :query_storage_time="query_storage_time"
          ></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside_Storage_Menu from '../Aside_Storage_Menu.vue';

export default {

  data() {
    return {
      //存储侧边栏子组件传过来的收藏类别
      storage_type: {},
      //传递给子组件Storage_List.vue的时间戳，供其监听
      query_storage_time: 0
    };
  },
  methods: {
    //在子组件(Aside_Storage_Menu)上接收子组件传的收藏类别的值
    async getMenuTypeFromChildren(item) {
      console.log(item.name);
      this.storage_type = item;
      this.query_storage_time = Date.now();
    }
  },
  components: { Aside_Storage_Menu }
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
.header b {
  margin-left: 5px;
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
