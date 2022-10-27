<template>
  <div>
    <div
      @click="selectLetterPeople(item)"
      class="tag"
      v-for="(item, index) in letter_peoples"
      :key="index"
    >
      <router-link
        :to="{ name: 'Letter_Panel', query: { with: `${item.id}` } }"
      >
        <el-avatar size="small" :src="circleUrl"></el-avatar>

        <span class="usernameClass">{{ item.userName }}</span>
        <el-badge :value="12" class="item"></el-badge>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      selectPeopleId: 0,
      letter_peoples: [{
        id: 0,
        userName: 'test1',
        ava: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      {
        id: 1,
        userName: 'test2',
        ava: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }]
    }
  },
  methods: {
    //将聊天对象用户名传给父组件PrivateLetter.vue
    selectLetterPeople(item) {

      this.selectPeopleId = item.id;
      this.$emit('getLetterPeopleFromAside', item);
      console.log("aside_private_letter --  selectLetterPeople --", item)
    }
  }

};
</script>

<style scoped>
.tag {
  margin-top: 5px;
  margin-left: 5px;
}
.usernameClass {
  padding-left: 10px;
  padding-top: 10px;
}
</style>
