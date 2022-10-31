<template>
  <div>
      <div>Storage_Dynamic_Detail : {{ dynamicId }}</div>

        <CommentChild ref="Storage_Dynamic_Detail_Comment"></CommentChild>

      <el-form v-model="record" :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-link @click="get_user(record.userId)">头像 </el-link>&nbsp;
              <el-link @click="get_user(record.userId)">{{record.username}} </el-link>
              <div>
                  {{ record.content }}
                  {{ record.comments }}
              </div>
            </el-form-item>
            <br></br>
              发表于&nbsp;<b>{{record.pubishTime}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="showComment()">评论</el-button>
           &nbsp;
            <el-button type="text" @click="encourge(record)"> 
              <i v-if="record.encourgeCount>0"  class="el-icon-thumb">{{record.encourgeCount}}赞</i>
              <i v-else  class="el-icon-thumb">0 赞</i>
           </el-button>
            &nbsp;
            <el-button type="text" @click="star(record)"> 
              <i v-if="record.starCount>0"  class="el-icon-star-off">{{record.starCount}} 收藏</i>
             <i v-else  class="el-icon-star-off">0 收藏</i>
            </el-button>
           
          </el-form>
  </div>

</template>

<script>
import CommentChild from "../Comment.vue";

export default {
  components: {
    CommentChild
  },
  data() {
    return {
      dynamicId: '',
      record: {
        commentID: 1111110,
        userid: 1,
        username: 'Alice',
        content: 'jkljgklagjkljgklagjkljgkjkljgklagjkljgklagjjkljgklagjkljgklagkljgklagjkljgklagjkljgklagjkljgklaglagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklagjkljgklags',
        comments: ['xxxx', 'yyyy'],
        encourgeCount: 123,
        starCount: 123,
        pubishTime: '2022-10-26 17:20'
      }
    }
  },
  methods: {
    getUrlParam() {
      var tem = this.$route.query.id;
      if (tem.length > 0) {
        this.dynamicId = tem;
      }

    },
    //调用评论子组件
    showComment() {
      this.$refs.Storage_Dynamic_Detail_Comment.open()
    },
  },
  mounted() {
    this.getUrlParam();
  },

};
</script>
