<template>
  <div>
     <CommentChild ref="commentChild"></CommentChild>
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="user" label="全部动态" width="full">
        <template slot-scope="scope">
          <el-form v-model="scope.row" :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-link @click="get_user(scope.row)">头像 </el-link>&nbsp;
              <el-link @click="get_user(scope.row)">{{scope.row.username}} </el-link>
              <div>
                  {{ scope.row.content }}
                  {{ scope.row.comments }}
              </div>
            </el-form-item>
            <br></br>
              发表于&nbsp;<b>{{scope.row.pubishTime}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="showComment()">评论</el-button>
           &nbsp;
            <el-button type="text" @click="encourge(scope.row)"> <i v-if="scope.row.encourgeFlag" style="background-color:lightblue" class="el-icon-thumb">已赞</i>
              <i v-else  class="el-icon-thumb">赞一个</i>
           </el-button>
            &nbsp;
            <el-button type="text" @click="star(scope.row)"> <i v-if="scope.row.starFlag" style="background-color:yellow" class="el-icon-star-off">已收藏</i>
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
</template>

<script>
import CommentChild from "../Comment.vue";
export default {
  name: 'Main',
  components: {
    CommentChild
  },
  data() {
    return {

      currentPage: 1,
      pageSize: 10,
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
        },
        {
          commentID: 1,
          userid: 2,
          username: 'Ben',
          content: 'jkljgklagjkljgklagjkljgkjkljgklagjkljgklagjjkljgklagjkljgklagkljgklagjkljgklagjkljgklagjkljgklaglagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklag',
          comments: ['xxxx', 'yyyy'],
          encourgeFlag: false,
          starFlag: false,
          pubishTime: '2022-10-26 10:20'
        }
      ]

    }

  },
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

      console.log(`当前页: ${val}`);

    },
    //调用评论子组件
    showComment() {
      this.$refs.commentChild.open()
    },
    encourge(comment) {
      console.log(comment.encourgeFlag)
      comment.encourgeFlag = !comment.encourgeFlag

    },
    star(comment) {
      console.log(comment.starFlag)
      comment.starFlag = !comment.starFlag

    },
    get_user(comment) {
      var url = 'http://localhost:8080/user/?id=' + comment.userid
      window.open(url);
    }
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
