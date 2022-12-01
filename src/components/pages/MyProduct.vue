<template>
  <div class="body">
    <div class="header">
      <span>我的创作</span>

      <b v-if="product_type != null && product_type.name !== ''">{{
        product_type.name
      }}</b>
    </div>
    <el-container>
      <el-container>
        <el-aside style="background-color: white" width="200px">
          <!--product_type传递给子组件 Product_List.vue-->
          <Product_Aside
            @getListFromProductAsideMenuType="getMenuTypeFromChildren($event)"
          ></Product_Aside>
        </el-aside>
        <el-main>
          <router-view
            :product_type="product_type"
            :query_product_time="query_product_time"
          ></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Product_Aside from '../product/Product_Aside.vue';

export default {

  data() {
    return {
      //存储侧边栏子组件传过来的收藏类别
      product_type: {},
      //传递给子组件Storage_List.vue的时间戳，供其监听
      query_product_time: 0
    };
  },
  methods: {
    //接收子组件(Product_Aside.vue)传的创作类别的值
    async getMenuTypeFromChildren(item) {
      console.log(" MyProduct.vue " + item.type);
      console.log(" MyProduct.vue " + item.name);
      this.product_type = item;
      this.query_product_time = Date.now();
    }
  },
  components: { Product_Aside }
};
</script>

<style scoped>
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
.tag :only-child {
  margin-top: 5px;
  margin-left: 5px;
}
</style>
