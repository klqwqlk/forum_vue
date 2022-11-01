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
          name: `Storage_${item.type}`,
          query: { storage_type: `${item.type}` },
        }"
      >
        <el-avatar size="small"></el-avatar>

        <span class="usernameClass">{{ item.name }}</span>
      </router-link>
    </div>
    <br></br>
    <div class="block">
      <span style="size:2px;" class="demonstration">{{currentMenu}}</span>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleStorageDirChange"
      ></el-cascader>
       <el-button @click="createStorageDir" type="primary">创建收藏夹</el-button>
      

       <!--创建收藏夹的表单-->
       <el-dialog
  title="创建新收藏夹"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleDialogClose">
 上级目录：  <el-cascader
        v-model="value_create"
        :options="options_create"
        :props="{ expandTrigger: 'hover' }"
      ></el-cascader>
  <el-form  label-position="left" label-width="80px" >
  <el-form-item label="名称">
    <el-input v-model="newStorageDirName"></el-input>
  </el-form-item>
    <el-button @click="confirmCreateDir" type="primary">创建</el-button>
</el-form>
</el-dialog>
      
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      //创建收藏夹时候的级联表单数据
      value_create: '',
      options_create: '',
      dialogVisible: false,
      newStorageDirName: '',
      selectPeopleId: 0,
      currentMenu: '',
      menu_list: [{
        type: 'Dynamic',
        name: '动态',
      },
      {
        type: 'Article',
        name: '文章',
      }
      ],
      value: [],
      options: [{
        value: 'default',
        label: '默认收藏夹'
      },
      {
        value: 'paper',
        label: '论文',
        children: [{
          value: 'Knowledge based systems',
          label: 'Knowledge based systems'
        }, {
          value: 'Pattern analysis and application',
          label: 'Pattern analysis and application'
        }]
      }, {
        value: 'favoriate',
        label: '我喜欢的',
        children: [{
          value: 'music',
          label: '音乐',
          children: [{
            value: 'Jay',
            label: '周杰伦',
            children: [{
              value: 'night seven',
              label: '夜的第七章'
            }]
          }, {
            value: 'JJ',
            label: '林俊杰'
          }]
        }, {
          value: 'movie',
          label: '电影'
        }]
      }]
    }
  },
  methods: {
    //将收藏对象传给父组件PrivateLetter.vue
    selectMenuType(item) {

      this.selectTypeId = item.id;
      this.$emit('getListFromAsideMenuType', item);
      console.log("Aside_Storage_Menu -- selectMenuType --  getMenuTypeFromChildren : ", item)
    },
    //级联菜单
    handleStorageDirChange(value) {
      this.currentMenu = '';
      for (var i = 0; i < value.length; i++) {
        this.currentMenu = this.currentMenu + "/" + value[i];
      }
      //转成storage_type类型传给父组件storage.vue
      var obj = {};
      obj.type = 'dir';
      var label = this.findLabel(value[value.length - 1], this.options);
      obj.name = label;
      obj.currentMenu = this.currentMenu;
      this.selectMenuType(obj);
      // console.log("value: " + value);
      // console.log("label:" + label);
      //改变路由
      this.$router.push({ path: '/storage_dir' + this.currentMenu, query: { id: 1 } });
    }
    ,
    //options菜单中寻找value对应的label
    findLabel(value, menu) {
      if (menu == null) {
        return '';
      }
      // console.log("findlabel: ", value, menu);
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].value === value) {
          return menu[i].label;
        }
      }
      for (var i = 0; i < menu.length; i++) {
        var res = this.findLabel(value, menu[i].children);
        if (res != '') {
          return res;
        }
      }
      return '';
    },
    createStorageDir() {
      this.dialogVisible = true;
      this.options_create = this.options;
      // console.log(this.value_create)

    },
    handleDialogClose() {
      this.dialogVisible = false;
    },
    confirmCreateDir() {
      var newfile = this.newStorageDirName.trim();
      if (newfile == '') {
        this.$message.error('新创建的文件夹名称不能为空！');
        return;
      }

      var dir = '';
      for (var i = 0; i < this.value_create.length; i++) {
        dir = dir + '/' + this.value_create[i];
      }
      dir = dir + '/' + newfile;
      console.log("newStorageDirName -- ", dir)
      this.handleDialogClose();
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
