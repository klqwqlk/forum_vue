<template>
  <div>
     <CommentChild ref="commentChild" :requestPath="childRequestPath" :requestId="childRequestId"></CommentChild>
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="user" label="全部动态" width="full">
        <template slot-scope="scope">
          <el-form v-model="scope.row" :inline="true" class="demo-form-inline">
            <el-form-item>
              <!-- <el-link @click="get_user(scope.row)">{{scope.row.dynamicId}} </el-link>&nbsp; -->
              <el-link style="background-color:aliceblue" @click="get_user(scope.row)">{{scope.row.userName}} </el-link>
              <div style="background-color:yellowgreen">
                  {{ scope.row.content }}
                  <!-- {{ scope.row.comments }} -->
              </div>
            </el-form-item>
            <br></br>
              发表于&nbsp;<b>{{scope.row.createTime}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="showComment(scope.row)">评论</el-button>
           &nbsp;
            <el-button type="text" @click="star(scope.row)"> 
              <i v-if="scope.row.starFlag==true" style="background-color:lightblue" class="el-icon-thumb">已赞</i>
           <i v-if="scope.row.starFlag==false"  class="el-icon-thumb">赞</i>
        
           </el-button>
        
           &nbsp;
            <el-button type="text" @click="storage(scope.row)"> 
              <i v-if="scope.row.storageFlag==true" style="background-color:yellow" class="el-icon-star-off">已收藏</i>
           <i v-if="scope.row.storageFlag==false"  class="el-icon-star-off">收藏</i>
            </el-button>
               &nbsp; &nbsp; &nbsp; &nbsp; <i >{{scope.row.starCount}} 赞</i>
              &nbsp;  &nbsp; &nbsp;<i >{{scope.row.storageCount}} 收藏</i>
          </el-form>
        </template>
      </el-table-column>
    </el-table>

    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import CommentChild from "../Comment.vue";
import request from '../../utils/request'


export default {
  name: 'Main',
  components: {
    CommentChild
  },
  data() {
    return {
      //传给评论子组件，后端请求路径
      childRequestPath: '/forum/dynamiccomment',
      //传给评论子组件,根据id查询评论
      childRequestId: 1,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      records: [
        {
          commentID: 0,
          userid: 1,
          username: 'Alice',
          content: 'jkljgklagjkljgklagjkljgkjkljgklagjkljgklagjjkljgklagjkljgklagkljgklagjkljgklagjkljgklagjkljgklaglagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklags',
          comments: ['xxxx', 'yyyy'],
          encourgeFlag: true,
          starFlag: true,
          pubishTime: '2022-10-26 17:20'
        }
      ]

    }

  },
  methods: {

    handleSizeChange(val) {
      console.log("alltrend.vue pagesize " + val);
      this.pageSize = val;
      this.getAll();
    },
    handleCurrentChange(val) {
      console.log("alltrend.vue currentPage " + val);
      this.currentPage = val;
      this.getAll();

    },
    //调用评论子组件
    showComment(item) {
      this.$refs.commentChild.open()
      this.childRequestId = item.dynamicId
    },
    storage(item) {
      console.log("storageFlag:  " + item.storageFlag)
      console.log("AllTrends.vue + storageFlag: ")
      var user = JSON.parse(window.localStorage.getItem("user"))
      console.log("user")
      console.log(user);
      request({
        method: 'post',
        url: '/forum/dynamicstorage/storageDynamic',
        headers: {
          'AuthToken': window.localStorage.getItem("AuthToken"),
        },
        data:
        {
          'userId': user != null ? user.userId + '' : ' ',
          'dynamicId': item.dynamicId,
          'storageFlag': !item.storageFlag
        }
      }).then((data) => {
        console.log("AllTrends.vue + storageFlag: ")
        console.log(data)
        item.storageFlag = data.data.storageFlag;
        if (item.storageFlag) {
          item.storageCount = item.storageCount + 1;
        } else {
          item.storageCount = item.storageCount - 1;
        }

      }).catch((error) => {
        console.log(error)
      })

      console.log("starFlag:  " + item.starFlag)
    },
    star(item) {
      console.log("starFlag:  " + item.starFlag)
      console.log("AllTrends.vue + starFlag: ")
      var user = JSON.parse(window.localStorage.getItem("user"))
      console.log("user")
      console.log(user);
      request({
        method: 'post',
        url: '/forum/dynamicstar/starDynamic',
        headers: {
          'AuthToken': window.localStorage.getItem("AuthToken"),

        },
        data:
        {
          'userId': user != null ? user.userId + '' : ' ',
          'dynamicId': item.dynamicId,
          'starFlag': !item.starFlag
        }
      }).then((data) => {
        console.log("AllTrends.vue + starFlag: ")
        console.log(data)
        item.starFlag = data.data.starFlag;
        if (item.starFlag) {
          item.starCount = item.starCount + 1;
        } else {
          item.starCount = item.starCount - 1;
        }

      }).catch((error) => {
        console.log(error)
      })

      console.log("starFlag:  " + item.starFlag)

    },
    get_user(comment) {
      var url = 'http://localhost:8080/user/?id=' + comment.userid
      window.open(url);
    },
    getAll() {
      var user = JSON.parse(window.localStorage.getItem("user"))

      request({
        method: 'post',
        url: '/forum/dynamic/getAll',
        headers: {
          'AuthToken': window.localStorage.getItem("AuthToken"),
          'userId': user != null ? user.userId : ' '
        },
        data: {
          'page': this.currentPage,
          'pageSize': this.pageSize
        }
      }).then((data) => {
        console.log("AllTrends.vue + data: ")
        console.log(data.data.data.records)
        var d = data.data.data;
        this.currentPage = d.current;
        this.total = d.total;
        var res = data.data.data.records;
        this.records = [];
        for (var i = 0; i < res.length; i++) {
          this.records.push(res[i])
        }

      })
    }
  },

  created() {
    this.getAll();
  },

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
