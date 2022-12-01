<template>
  <div>
    <div>Topic_circle_Detail : {{ articleId }}</div>

    <div>
          {{ circleDetail.circleName }} 
          
          <i v-if="circleDetail.joinFlag">--已参与--</i>
          <i v-else>--未参与--</i>
          
          <br></br>
                  {{ circleDetail.description }}
                   <br></br>
              创建于&nbsp;<b>{{circleDetail.createTime}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;
            <el-button type="text" @click="joinCircle()"> 
              <i v-if="circleDetail.joinFlag"  class="el-icon-thumb">退出</i>
              <i v-else  class="el-icon-thumb">参与</i>
           </el-button>
            &nbsp;
            <el-button type="text" > 
              <i  class="el-icon-star-off">{{circleDetail.joinPeople}}人参与该话题圈</i>
            </el-button>
    </div>

    <el-divider></el-divider>
     <div>
     <CommentChild ref="commentChild"></CommentChild>
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="user" label="讨论" width="full">
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

     
  </div>
</template>


<script>
import CommentChild from "../Comment.vue";
export default {
  name: 'Circle_Detail',
  components: {
    CommentChild
  },
  data() {
    return {
      articleId: '',
      circleDetail: {
        circleId: 1,
        circleName: '话题圈1',
        description: '话题圈1 jkljgklagjkljgklagjkljgkjkljgklagjkljgklagjjkljgklagjkljgklagkljgklagjkljgklagjkljgklagjkljgklaglagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklags',
        joinPeople: 1234,
        joinFlag: true,
        createTime: '2022-10-26 17:20'
      },
      currentPage: 1,
      pageSize: 10,
      records: [
        {
          //属于哪个话题圈的讨论
          circleId: 0,
          userid: 1,
          username: 'Alice',
          content: '--话题圈的讨论1--jkljgklagjkljgklagjkljgkjkljgklagjkljgklagjjkljgklagjkljgklagkljgklagjkljgklagjkljgklagjkljgklaglagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklags',
          comments: ['xxxx', 'yyyy'],
          encourgeFlag: true,
          starFlag: true,
          pubishTime: '2022-10-26 17:20'
        },
        {
          //属于哪个话题圈的讨论
          circleId: 0,
          userid: 2,
          username: 'Ben',
          content: '--话题圈的讨论2--jkljgklagjkljgklagjkljgkjkljgklagjkljgklagjjkljgklagjkljgklagkljgklagjkljgklagjkljgklagjkljgklaglagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklag',
          comments: ['xxxx', 'yyyy'],
          encourgeFlag: false,
          starFlag: false,
          pubishTime: '2022-10-26 10:20'
        }
      ]
    }
  },
  methods: {
    getUrlParam() {
      var tem = this.$route.query.id;
      if (tem.length > 0) {
        this.articleId = tem;
      }

    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

      console.log(`当前页: ${val}`);

    },
    //调用评论子组件
    showComment() {
      this.$refs.commentChild.open()
    },

    joinCircle() {
      console.log(" Circle_Detail.vue " + this.circleDetail.joinFlag)
      this.circleDetail.joinFlag = !this.circleDetail.joinFlag

    },

    get_user(comment) {
      var url = 'http://localhost:8080/user/?id=' + comment.userid
      window.open(url);
    }
  },
  mounted() {
    this.getUrlParam();
  },

};
</script>

