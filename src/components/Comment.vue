<template>
  <div class="entire">
    <el-dialog
      title="评论"
      :visible.sync="dialogFormVisible"
      close="handleDialogClose"
      :before-close="handleDialogClose"
    >
      <!--对记录的评论-->
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>

      <el-button type="primary" @click="submitComment(1, 1)"> 确 定 </el-button>
      <el-divider></el-divider>
      <div class="CommentBlock" v-for="(item, index) in records" :key="index">
        <div
          v-if="item.parentCommentId == -1"
          @click="
            selectComment(
              item.fromUserId,
              item.fromUserName,
              index,
              item.commentId
            )
          "
        >
          <div>
            <span class="time">{{ item.commentTime }}</span>
          </div>
          <span style="background-color: lightgray"
            >{{ item.fromUserName }} </span
          >&nbsp; : &nbsp;&nbsp;&nbsp;{{ item.content }}
        </div>
        <div
          v-for="(childrenItem, childIndex) in item.childComments"
          :key="childIndex"
        >
          &nbsp;&nbsp;&nbsp;&nbsp;<span
            style="background-color: yellow"
            @click="
              selectComment(
                childrenItem.fromUserId,
                childrenItem.fromUserName,
                index,
                childrenItem.parentCommentId
              )
            "
            >{{ childrenItem.fromUserName }}</span
          >回复<span
            style="background-color: yellow"
            @click="
              selectComment(
                childrenItem.toUserId,
                childrenItem.toUserName,
                index,
                childrenItem.parentCommentId
              )
            "
            >{{ childrenItem.toUserName }}</span
          >:&nbsp;&nbsp;{{ childrenItem.content }}
          <span class="time">{{ childrenItem.commentTime }}</span>
        </div>
        <!--在评论或子评论进行评论，弹出新的输入框-->
        <div v-if="OpenInput(index)">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="childTextarea"
          >
          </el-input>
          回复
          <el-tag
            v-show="CommentToWho.toUserName != ''"
            :key="CommentToWho.toUserId"
            type="info"
            :disable-transitions="false"
          >
            {{ CommentToWho.toUserName }}
          </el-tag>
          <el-button
            type="primary"
            @click="submitComment(CommentToWho.toUserId, 2)"
          >
            确 定
          </el-button>
        </div>

        <div class="ChildCommentPagination">
          <!--每页显示10个子评论，如果不够10个，就不要分页-->
          <el-pagination
            v-if="item.length > 10"
            @current-change="handleChildCommentPageChange"
            :current-page.sync="childCommentPage"
            :page-size="2"
            layout="total, prev, pager, next"
            :total="item.length"
          >
          </el-pagination>
        </div>
        <el-divider></el-divider>
      </div>

      <div slot="footer" class="dialog-footer">
        <div class="TotalPagination">
          <el-pagination
            @current-change="handleCommentPageChange"
            :current-page.sync="commentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="firstCommentTotal"
          >
          </el-pagination>
        </div>

        <el-button @click="cancelButton">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '../utils/request'

export default {
  props: ['requestPath', 'requestId'],
  data() {
    return {
      commentPage: 1, //一级评论页表
      childCommentPage: 1, //二级评论页表
      dialogFormVisible: false,
      //一级评论和二级评论的当前页，每页大小
      page: 1,
      pageSize: 10,
      childPage: 1,
      childPageSize: 5,
      firstCommentTotal: 0,
      records: [],
      textarea: '',
      childTextarea: '',
      CommentToWho: {
        parentCommentId: -1,
        toUserId: '',
        toUserName: ''
      },
      currentClickedCommentBlock: -1,//评论块的id
    }
  },
  methods: {
    submitComment(toUserId, type) {
      // dialogFormVisible = false
      var user = JSON.parse(window.localStorage.getItem("user"))
      var content = '';
      if (type == 1) {
        content = this.textarea;
      } else if (type == 2) {
        content = this.childTextarea;
      }
      request({
        method: 'post',
        url: this.requestPath + "/comment",
        headers: {
          'AuthToken': window.localStorage.getItem("AuthToken"),
          'userId': user != null ? user.userId + '' : ' ',
        },
        data:
        {
          'dynamicId': this.requestId,
          'parentCommentId': this.CommentToWho.parentCommentId,
          'toUserId': toUserId,
          'content': content
        }
      }).then((data) => {
        console.log("Comment.vue  -- data : ")
        console.log(data)


      }).catch((error) => {
        console.log(error)
      })
    },
    //请求后端拿到评论
    getComment() {
      console.log("Comment.vue path:  " + this.requestPath)
      console.log("Comment.vue  " + this.page)
      console.log("Comment.vue  " + this.pageSize)
      var user = JSON.parse(window.localStorage.getItem("user"))
      console.log("user")
      console.log(user);
      request({
        method: 'post',
        url: this.requestPath + "/getComment",
        headers: {
          'AuthToken': window.localStorage.getItem("AuthToken"),
        },
        data:
        {
          'userId': user != null ? user.userId + '' : ' ',
          'dynamicId': this.requestId,
          'page': this.page,
          'pageSize': this.pageSize,
          'childPage': this.childPage,
          'childPageSize': this.childPageSize
        }
      }).then((data) => {
        console.log("Comment.vue  -- data : ")
        console.log(this.requestPath + " ：" + this.requestId)
        console.log("Comment.vue  -- data : ")
        console.log(data)
        console.log(data.data.data.total)
        this.firstCommentTotal = data.data.data.total
        this.records = data.data.data.records
        console.log("Comment.vue  -- records : ")
        console.log(this.records)

      }).catch((error) => {
        console.log(error)
      })

    },
    //一级评论分页
    handleCommentPageChange() {

    },
    // 二级评论分页
    handleChildCommentPageChange() {

    },
    open() { // 在父组件调用打开
      this.dialogFormVisible = true
      console.log("child open")
      this.getComment();
    },
    OpenInput(index) {
      if (this.currentClickedCommentBlock != null) {
        return this.currentClickedCommentBlock === index;
      }
      return false;
    },
    /**
     * 
     * @param {*一级评论id} commentId 
     * @param {*一级评论用户名称} commentUsername 
     * @param {*当前评论页的评论块的key} index 
     */
    selectComment(touserId, toUserName, index, parentCommentId) {
      console.log(touserId);
      console.log(toUserName);
      this.CommentToWho.toUserId = touserId;
      this.CommentToWho.toUserName = toUserName;
      this.currentClickedCommentBlock = index;
      this.CommentToWho.parentCommentId = parentCommentId;
      console.log(this.currentClickedCommentBlock);
    },
    handleDialogClose() {
      this.dialogFormVisible = false;
      this.textarea = '';
      this.CommentToWho.toUserName = '';
      this.CommentToWho.toUserId = '';
      this.currentClickedCommentBlock = -1;
      this.records = [];
    },
    cancelButton() {

      this.dialogFormVisible = false;
      this.textarea = '';
      this.CommentToWho.toUserName = '';
      this.CommentToWho.toUserId = '';
      this.currentClickedCommentBlock = -1;
    }
  }, mounted() {


    this.getComment();

    // for (var i = 0; i < 10; i++) {
    //   this.records[0].children.push({
    //     record: 0, //哪条记录下的评论
    //     commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
    //     level: 1,
    //     fromUserId: 3,
    //     toUserId: 2,
    //     fromUserName: 'user3',
    //     toUserName: 'user2',
    //     content: 'l love you!! user2！',
    //     pubishTime: '2022-10-26 23:10'
    //   });
    // }
    // for (var i = 0; i < 7; i++) {



    //   this.records.push({
    //     level: 0, //0表示直接在评论下进行评论; 1表示在评论的评论下进行评论
    //     fromUserId: 1,
    //     toUserId: 2,
    //     fromUserName: 'user1',
    //     toUserName: 'user2',
    //     content: 'l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！',
    //     pubishTime: '2022-10-26 9:10',
    //     children: [
    //       {
    //         record: 0,//哪条记录下的评论
    //         commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
    //         level: 1,
    //         fromUserId: 2,
    //         toUserId: 1,
    //         fromUserName: 'user2',
    //         toUserName: 'user1',
    //         content: 'l love you!! user1！',
    //         pubishTime: '2022-10-26 17:20'
    //       },
    //       {
    //         record: 0, //哪条记录下的评论
    //         commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
    //         level: 1,
    //         fromUserId: 3,
    //         toUserId: 2,
    //         fromUserName: 'user3',
    //         toUserName: 'user2',
    //         content: 'l love you!! user2！',
    //         pubishTime: '2022-10-26 23:10'
    //       }
    //     ]
    // });


  }
};
</script>

<style scoped>
.entire {
}
.time {
}
.TotalPagination {
  float: left;
}
.el-button {
  margin-left: 90%;
}
.CommentBlock {
  margin-bottom: 10px;
}
</style>