<template>
  <div>
    <el-table :data="tmpdate" style="width: 100%">
      <el-table-column prop="date" label="日期" width="full"> </el-table-column>
    </el-table>

    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
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
      currentPage4: 1,
      pageSize: 10,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData2: [{
        date: '22-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '22-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '22-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '22-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tmpdate: []
    }

  },
  methods: {
    handleSizeChange(val) {
      if (val > this.pageSize) {
        this.pageSize = val;
      }
    },
    handleCurrentChange(val) {

      console.log(`当前页: ${val}`);
      if (val % 2 == 0) {
        this.tmpdate = this.tableData;
      } else {
        this.tmpdate = this.tableData2;
      }
      console.log(this.tmpdate.length)
      for (var i = this.tmpdate.length; i < this.pageSize; i++) {
        this.tmpdate.push({ date: '22-05-' + i })
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
