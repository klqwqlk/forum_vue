<template>
  <div>
    <el-dialog
      title="评论"
      :visible.sync="dialogFormVisible"
      close="handleDialogClose"
    >
      <div v-for="(item, index) in records" :key="index">
        <div
          v-if="item.level == 0"
          @click="selectComment(item.fromUserId, item.fromUserName)"
        >
          <span style="background-color: gray">{{ item.fromUserName }}</span
          >:&nbsp;&nbsp;{{ item.content }}
        </div>
        <div
          v-if="item.level == 1"
          @click="selectComment(item.fromUserId, item.fromUserName)"
        >
          &nbsp;&nbsp;&nbsp;&nbsp;<span style="background-color: yellow">{{
            item.fromUserName
          }}</span
          >回复<span style="background-color: yellow">{{
            item.toUserName
          }}</span
          >:&nbsp;&nbsp;{{ item.content }}
        </div>
      </div>

      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-tag
        v-show="CommentToWho != ''"
        :key="CommentToWho"
        closable
        type="info"
        :disable-transitions="false"
        @close="handleTagClose()"
      >
        {{ CommentToWho }}
      </el-tag>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButton">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialogFormVisible: false,
      records: [
        {
          level: 0, //0表示直接在评论下进行评论; 1表示在评论的评论下进行评论
          fromUserId: 1,
          toUserId: 2,
          fromUserName: 'user1',
          toUserName: 'user2',
          content: 'l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！l love you!! user2！',
        },
        {
          level: 1,
          fromUserId: 2,
          toUserId: 1,
          fromUserName: 'user2',
          toUserName: 'user1',
          content: 'l love you!! user1！',
        },
        {
          level: 1,
          fromUserId: 3,
          toUserId: 2,
          fromUserName: 'user3',
          toUserName: 'user2',
          content: 'l love you!! user2！',
        }
      ],
      textarea: '',
      CommentToWho: ''
    }
  },
  methods: {
    open() { // 在父组件调用打开
      this.dialogFormVisible = true
      console.log("child open")
    },
    selectComment(id, username) {
      console.log(id);
      console.log(username);
      this.CommentToWho = username
    },
    handleTagClose() {
      this.CommentToWho = ''
    },
    handleDialogClose() {
      this.textarea = '';
      this.CommentToWho = '';
    },
    cancelButton() {

      this.dialogFormVisible = false;
      this.textarea = '';
      this.CommentToWho = '';
    }
  }
};
</script>
