<template>
  <div>
    <div class="msgWindow">
      <div class="msgList" v-for="(item, index) in msgList" :key="index">
        <div class="from" v-if="item.from != currentUser.userId">
          {{ fromUser.userAva }}
          {{ fromUser.userName }}
          {{ item.sendTime }}
          <div>{{ item.content }}</div>
        </div>
        <div class="to" v-if="item.from == currentUser.userId">
          {{ currentUser.userAva }}
          {{ currentUser.userName }}
          {{ item.sendTime }}
          <div>{{ item.content }}</div>
        </div>
      </div>
    </div>
    <div class="msgInput">
      <el-input
        type="textarea"
        rows="5"
        v-model="input"
        placeholder="请输入内容"
        maxlength="1000"
      ></el-input>
    </div>
    <el-button type="primary">发送</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fromUser: { userId: 0, userName: 'text1', userAva: 'xxx' },
      currentUser: { userId: 1, userName: 'text2', userAva: 'yyy' },
      input: '',
      msgList: [{
        from: 0,
        to: 1,
        content: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        sendTime: '2020 / 10 / 27 16:56:23'
      },
      {
        from: 1,
        to: 0,
        content: '好你好你好你好你好你好好你好你好你好你好你好好你好你好你好你好你好!',
        sendTime: '2020/10/27 16:56:35'
      },
      {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      },
      {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      },
      {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      },
      {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      },
      {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      }, {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      }, {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      }, {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      },
      {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },
      {
        from: 0,
        to: 1,
        content: '我是Alice',
        sendTime: '2020/10/27 16:57:35'
      },
      {
        from: 1,
        to: 0,
        content: '你是?',
        sendTime: '2020/10/27 16:56:50'
      },

      ]
    }
  },
  methods: {

  }

};
</script>

<style scoped>
.tag {
  margin-top: 5px;
  margin-left: 5px;
}
.msgWindow {
  height: 420px;
  overflow: scroll;
  margin-bottom: 10px;
}
.msgInput {
  height: 100px;
  width: 93%;
}
.from {
  background-color: antiquewhite;
  width: 500px;
}
.to {
  background-color: aquamarine;
  width: 500px;
  margin-left: 500px;
}

.msgList div {
  margin-top: 5px;
}

.el-button {
  margin-top: -30px;
  float: right;
}
</style>
