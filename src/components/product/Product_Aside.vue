<template>
  <div>
    <div
      @click="selectMenuType(item)"
      class="tag"
      v-for="(item, index) in menu_list"
      :key="index"
    >
      <router-link
        :to="{
          name: `Product_${item.type}`,
          query: { product_type: `${item.type}` }
        }"
      >
        <el-avatar size="small"></el-avatar>

        <span class="usernameClass">{{ item.name }}</span>
      </router-link>
    </div>
    <br></br>
    <div class="block">
       <el-button @click="createDynamic" type="primary">发表动态</el-button><br>
       <el-button @click="createArticle" type="primary">发表文章</el-button>
      </div>
  </div>
</template>



<script>

export default {
  data() {
    return {
      selectPeopleId: 0,
      currentMenu: '',
      menu_list: [{
        type: 'Dynamic',
        name: '动态',
      },
      {
        type: 'Article',
        name: '文章',
      }]
    }
  },
  methods: {
    //将收藏对象传给父组件PrivateLetter.vue
    selectMenuType(item) {

      this.selectTypeId = item.id;
      this.$emit('getListFromProductAsideMenuType', item);
      console.log("Product_Aside -- selectMenuType --  getMenuTypeFromChildren : ", item)
    }

  }

};
</script>

<style scoped>
.tag {
  margin-top: 5px;
  margin-left: 5px;
}
.usernameClass {
  padding-left: 10px;
  padding-top: 10px;
}
</style>
