<template>
  <div>
     <CommentChild ref="commentChild"></CommentChild>
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="user" label="日期" width="full">
        <template slot-scope="scope">
          <el-form v-model="scope.row" :inline="true" class="demo-form-inline">
            <el-form-item :label="scope.row.username">
              {{ scope.row.userid }}
              {{ scope.row.username }}
              {{ scope.row.content }}
              {{ scope.row.comments }}
              <div>

              </div>
            </el-form-item>
            <br></br>
              <el-button type="text" @click="showComment()">评论</el-button>
            </el-form-item>
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
import CommentChild from "./Comment.vue";
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
          userid: 1,
          username: 'Alice',
          content: 'l love you!!爱你！',
          comments: ['xxxx', 'yyyy']
        },
        {
          userid: 2,
          username: 'Ben',
          content: 'l love you!!爱你！',
          comments: ['xxxx', 'yyyy']
        }
      ]

    }

  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      for (var i = 0; this.records.length < val; i++) {
        this.records.push({});
      }
      for (var i = 0; this.records.length > val; i++) {
        this.records.pop();
      }
      console.log(this.records.length)
    },
    handleCurrentChange(val) {

      console.log(`当前页: ${val}`);

    },
    showComment() {
      this.$refs.commentChild.open()
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
