<template>
  
  <div >
   
    <!--如果type=='',显示空白-->
  <div v-if="this.storage_type != null && this.storage_type.type==''"> </div>
  <div v-else>
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="records" :label="typeLabel" width="full">
        <template slot-scope="scope" >
          <el-form  v-model="scope.row" :inline="true" class="demo-form-inline">
            <div @click="getStorageDetail(scope.row)">
            <el-form-item>
              
              <el-link @click="get_user(scope.row.pubishUser)">头像 </el-link>&nbsp;
              <el-link @click="get_user(scope.row.pubishUser)">{{scope.row.username}} </el-link>
            
              <div>
                  {{ scope.row.content }}
                  {{ scope.row.comments }}
              </div>
             
            </el-form-item>
             </div>
            <br></br>
              发表于&nbsp;<b>{{scope.row.pubishTime}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="showComment()">评论</el-button>
           &nbsp;
            <el-button type="text" @click="encourge(scope.row)"> 
              <i v-if="scope.row.encourgeFlag" style="background-color:lightblue" class="el-icon-thumb">{{}}赞</i>
           </el-button>
            &nbsp;
            <el-button type="text" @click="star(scope.row)">
               <i v-if="scope.row.starFlag" style="background-color:yellow" class="el-icon-star-off">{{}}收藏</i>
             <i v-else  class="el-icon-star-off">收藏</i>
            </el-button>
           
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="50"
    >
    </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Storage_List',
  //父组件Storage.vue传过来的对象及时间戳
  props: { storage_type: {}, query_storage_time: 0 },
  data() {
    return {

      //收藏类别的标签
      typeLabel: '',
      // storage_type: '', // 收藏的类别（dynamic, article） ，根据这个填充页面
      currentPage: 1,
      pageSize: 10,
      //收藏的类别的记录
      records: []

    }

  },
  methods: {

    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

      console.log(`Storage_List.vue -- 当前页: ${val}`);

    },
    updateType() {
      this.typeLabel = this.storage_type.name
      //按收藏类别
      if (this.storage_type.type == 'Dynamic') {
        this.getMyStorageDynamic();
      } else if (this.storage_type.type == 'Article') {
        this.getMyStorageArticle();
        //按收藏文件夹
      } else if (this.storage_type.type == 'dir') {
        this.getMyStorageFromDir();
      }
      console.log("updateType....")
    },
    //新开页，动态或文章的详情
    getStorageDetail(item) {
      var url = 'http://localhost:8080/storage/' + this.storage_type.type.toLowerCase() + '/detail/?id=' + item.id;
      window.open(url);
    },
    //打开新页面
    get_user(user) {
      var url = 'http://localhost:8080/user/?id=' + user.userId
      window.open(url);
    },
    getMyStorageDynamic() {
      this.records = [];
      this.records.push({
        id: 1,
        pubishUser: {
          userId: 0,
          userName: 'user1'
        },
        content: '收藏的动态。。。1',
        encourgeNum: 100,
        commentNum: 20

      }, {
        id: 2,
        pubishUser: {
          userId: 1,
          userName: 'user2'
        },
        content: '收藏的动态。。。2',
        encourgeNum: 121,
        commentNum: 20

      }
      );
    },
    getMyStorageArticle() {

      this.records = [];
      this.records.push({
        id: 1,
        pubishUser: {
          userId: 0,
          userName: 'user1'
        },
        content: '收藏的文章。。。1',
        encourgeNum: 200,
        commentNum: 50

      },
        {
          id: 2,
          pubishUser: {
            userId: 1,
            userName: 'user2'
          },
          content: '收藏的文章。。。2',
          encourgeNum: 200,
          commentNum: 50

        });
    },
    //按文件夹获取收藏内容
    getMyStorageFromDir() {
      //收藏目录
      console.log(this.storage_type.currentMenu);

      this.records = [];
      this.records.push({
        id: 1,
        pubishUser: {
          userId: 0,
          userName: 'user1'
        },
        content: '文件夹收藏的内容。。。1',
        encourgeNum: 200,
        commentNum: 50

      },
        {
          id: 2,
          pubishUser: {
            userId: 1,
            userName: 'user2'
          },
          content: '文件夹收藏的内容。。。2',
          encourgeNum: 200,
          commentNum: 50

        });
    }

  },
  // 监听url变化
  // watch: {
  //   $route(to, from) {
  //     if (to.fullPath.indexOf("storage_Dynamic") != -1) {
  //       // console.log("storage_Dynamic")
  //       this.typeLabel = '收藏的动态';
  //       this.storage_type = 'dynamic';
  //     } else if (to.fullPath.indexOf("storage_Article") != -1) {
  //       // console.log("storage_Article")
  //       this.typeLabel = '收藏的文章';
  //       this.storage_type = 'article';
  //     }
  //   }
  // },

  //监听父组件Storage.vue 传过来的storage_type对象
  watch: {
    //监听父组件Storage.vue传来的时间戳，调用刷新方法
    query_storage_time(newVal, oldVal) {
      // console.log(newVal)
      // console.log(oldVal)
      // console.log(" watch storage_type.time  ", newVal);
      this.updateType();
    },
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
</style>
