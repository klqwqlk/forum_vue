<template>
  <div>

    <el-table :data="records" style="width: 100%">
      <el-table-column prop="user" label="话题圈" width="full">
        <template slot-scope="scope">
          <el-form v-model="scope.row" :inline="true" class="demo-form-inline">
            <el-form-item >
           
                 <el-link @click="get_circle(scope.row)">话题圈封面 </el-link>&nbsp;
              <el-link @click="get_circle(scope.row)">{{scope.row.circleName}} </el-link><br></br>
                 <el-link @click="get_circle(scope.row)">{{scope.row.description}} </el-link>
             
            </el-form-item>
            <br></br>
           
            <el-button type="text" @click="joinCircle(scope.row)"> 
              <i v-if="scope.row.joinFlag" style="background-color:lightblue" class="el-icon-thumb">已参与</i>
              <i v-else  class="el-icon-thumb">参与</i>
           </el-button>
            &nbsp;
            <el-button type="text">
             <i  class="el-icon-star-off">{{scope.row.joinPeople}}人参与</i>
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

export default {
  name: 'Main',

  data() {
    return {

      currentPage: 1,
      pageSize: 10,
      records: [
        {
          commentID: 0,
          circleId: 1,
          circleName: '计算机网络爱好者之地',
          description: '为计算机网络爱好者打造的话题圈',
          joinFlag: true,
          joinPeople: 1235
        },
        {
          commentID: 0,
          circleId: 2,
          circleName: '数据库爱好者之地',
          description: '为数据库爱好者打造的话题圈',
          joinFlag: true,
          joinPeople: 2654
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

    joinCircle(comment) {
      console.log("Topic_Circle.vue " + comment.joinFlag)
      comment.joinFlag = !comment.joinFlag
    },
    get_circle(comment) {
      var url = 'http://localhost:8080/circle/?id=' + comment.circleId
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
