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

      <el-button type="primary" @click="dialogFormVisible = false">
        确 定
      </el-button>
      <el-divider></el-divider>
      <div class="CommentBlock" v-for="(item, index) in records" :key="index">
        <div
          v-if="item.level == 0"
          @click="selectComment(item.fromUserId, item.fromUserName, index)"
        >
          <span style="background-color: gray">{{ item.fromUserName }}</span>
          &nbsp;<span class="time">{{ item.pubishTime }}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}
        </div>
        <div
          v-for="(childrenItem, childIndex) in item.children"
          :key="childIndex"
          @click="
            selectComment(
              childrenItem.fromUserId,
              childrenItem.fromUserName,
              index
            )
          "
        >
          &nbsp;&nbsp;&nbsp;&nbsp;<span style="background-color: yellow">{{
            childrenItem.fromUserName
          }}</span
          >回复<span style="background-color: yellow">{{
            childrenItem.toUserName
          }}</span
          >:&nbsp;&nbsp;{{ childrenItem.content }}
          <span class="time">{{ childrenItem.pubishTime }}</span>
        </div>
        <!--在评论或子评论进行评论，弹出新的输入框-->
        <div v-if="OpenInput(index)">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
          回复
          <el-tag
            v-show="CommentToWho != ''"
            :key="CommentToWho"
            type="info"
            :disable-transitions="false"
          >
            {{ CommentToWho }}
          </el-tag>
        </div>

        <div class="ChildCommentPagination">
          <!--每页显示10个子评论，如果不够10个，就不要分页-->
          <el-pagination
            v-if="item.children.length > 10"
            @current-change="handleChildCommentPageChange"
            :current-page.sync="childCommentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="item.children.length"
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
            :page-size="10"
            layout="total, prev, pager, next"
            :total="30"
          >
          </el-pagination>
        </div>

        <el-button @click="cancelButton">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      commentPage: 1, //一级评论页表
      childCommentPage: 1, //二级评论页表
      dialogFormVisible: false,
      records: [
        {
          record: 0, //哪条记录下的评论 
          commentId: 101, //评论id (level为0 ，为该评论id；level为1，为父评论id)
          level: 0, //0表示直接在评论下进行评论; 1表示在评论的评论下进行评论
          fromUserId: 1,
          toUserId: 2,
          fromUserName: 'user1',
          toUserName: 'user2',
          content: 'l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！',
          pubishTime: '2022-10-26 9:10',
          children: [
            {
              record: 0,//哪条记录下的评论
              commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
              level: 1,
              fromUserId: 2,
              toUserId: 1,
              fromUserName: 'user2',
              toUserName: 'user1',
              content: 'l love you!! user1！',
              pubishTime: '2022-10-26 17:20'
            },
            {
              record: 0, //哪条记录下的评论
              commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
              level: 1,
              fromUserId: 3,
              toUserId: 2,
              fromUserName: 'user3',
              toUserName: 'user2',
              content: 'l love you!! user2！',
              pubishTime: '2022-10-26 23:10'
            }
          ]
        }
      ],
      textarea: '',
      CommentToWho: '',
      currentClickedCommentBlock: -1,//评论块的id
    }
  },
  methods: {
    //一级评论分页
    handleCommentPageChange() {

    },
    // 二级评论分页
    handleChildCommentPageChange() {

    },
    open() { // 在父组件调用打开
      this.dialogFormVisible = true
      console.log("child open")
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
    selectComment(commentId, commentUsername, index) {
      console.log(commentId);
      console.log(commentUsername);
      this.CommentToWho = commentUsername;
      this.currentClickedCommentBlock = index;
      console.log(this.currentClickedCommentBlock);
    },
    handleDialogClose() {
      this.dialogFormVisible = false;
      this.textarea = '';
      this.CommentToWho = '';
      this.currentClickedCommentBlock = -1;
    },
    cancelButton() {

      this.dialogFormVisible = false;
      this.textarea = '';
      this.CommentToWho = '';
      this.currentClickedCommentBlock = -1;
    }
  }, mounted() {

    for (var i = 0; i < 10; i++) {
      this.records[0].children.push({
        record: 0, //哪条记录下的评论
        commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
        level: 1,
        fromUserId: 3,
        toUserId: 2,
        fromUserName: 'user3',
        toUserName: 'user2',
        content: 'l love you!! user2！',
        pubishTime: '2022-10-26 23:10'
      });
    }
    for (var i = 0; i < 7; i++) {



      this.records.push({
        level: 0, //0表示直接在评论下进行评论; 1表示在评论的评论下进行评论
        fromUserId: 1,
        toUserId: 2,
        fromUserName: 'user1',
        toUserName: 'user2',
        content: 'l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！',
        pubishTime: '2022-10-26 9:10',
        children: [
          {
            record: 0,//哪条记录下的评论
            commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
            level: 1,
            fromUserId: 2,
            toUserId: 1,
            fromUserName: 'user2',
            toUserName: 'user1',
            content: 'l love you!! user1！',
            pubishTime: '2022-10-26 17:20'
          },
          {
            record: 0, //哪条记录下的评论
            commentId: 101,  //评论id (level为0 ，为该评论id；level为1，为父评论id)
            level: 1,
            fromUserId: 3,
            toUserId: 2,
            fromUserName: 'user3',
            toUserName: 'user2',
            content: 'l love you!! user2！',
            pubishTime: '2022-10-26 23:10'
          }
        ]
      });


    }
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