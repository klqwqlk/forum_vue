<template>
  <div>
    <el-checkbox
      v-model="checkedConcerned"
      style="margin-left: 20px; margin-right: 20px"
      >查看取消关注的人</el-checkbox
    >
    <el-input
      style="width: 200px"
      v-model="searchInput"
      placeholder="请输入要查询的用户名"
    ></el-input>
    <el-button type="primary" @click="searchByName">查询</el-button>
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="user" :label="label" width="full">
        <template slot-scope="scope">
          <el-form v-model="scope.row" :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-link @click="get_user(scope.row)">头像 </el-link>&nbsp;
              <el-link @click="get_user(scope.row)"
                >{{ scope.row.username }}
              </el-link>
            </el-form-item>

            <el-button type="text" @click="cancelConcern(scope.row)">
              <i v-if="scope.row.concernedFlag" class="el-icon-minus"
                >取消关注</i
              >
              <i v-else class="el-icon-plus">关注</i>
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
      label: '关注的人',
      checkedConcerned: false,
      searchInput: '',
      currentPage: 1,
      pageSize: 10,
      records: [
        {
          userid: 1,
          username: 'Alice',
          content: '简短的自我介绍 1',
          concernedFlag: true,
          concernedTime: '2022-10-26 17:20'
        },
        {
          userid: 2,
          username: 'Bob',
          content: '简短的自我介绍 2',
          concernedFlag: true,
          concernedTime: '2022-10-26 17:20'
        },
        {
          userid: 3,
          username: 'Ben',
          content: '简短的自我介绍 3',
          concernedFlag: true,
          concernedTime: '2022-10-26 17:20'
        },
      ]

    }

  },
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

      console.log(`当前页: ${val}`);

    },

    cancelConcern(people) {
      console.log(people.concernedFlag)
      people.concernedFlag = !people.concernedFlag

    },

    get_user(comment) {
      var url = 'http://localhost:8080/user/?id=' + comment.userid
      window.open(url);
    },
    searchByName() {
      var str = this.searchInput.trim();
      console.log("searchByName : ", str)
      if (str != '') {
        this.records = [];
        this.records.push({
          userid: 1,
          username: '查询用户1',
          content: '简短的自我介绍 1',
          concernedFlag: true,
          concernedTime: '2022-10-26 17:20'
        },
          {
            userid: 2,
            username: '查询用户2',
            content: '简短的自我介绍 2',
            concernedFlag: true,
            concernedTime: '2022-10-26 17:20'
          });
      } else {

        this.records = [];
        this.records.push({
          userid: 1,
          username: 'Alice',
          content: '简短的自我介绍 1',
          concernedFlag: true,
          concernedTime: '2022-10-26 17:20'
        },
          {
            userid: 2,
            username: 'Bob',
            content: '简短的自我介绍 2',
            concernedFlag: true,
            concernedTime: '2022-10-26 17:20'
          });

      }
      console.log("searchByName -", this.records)
    }
  },
  watch: {
    checkedConcerned(newVal, oldVal) {
      if (newVal == true) {
        this.label = '取消关注的人'
      } else {
        this.label = '关注的人'
      }
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
