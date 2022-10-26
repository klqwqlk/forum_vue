<template>
  <div>
    <div class="tag">
      <router-link :to="{ name: 'AllTrends' }" replace>全部动态</router-link>
    </div>
    <div class="tag">
      <router-link :to="{ name: 'CareAbout' }" replace>我关注的</router-link>
    </div>
    <div class="tag">
      <router-link :to="{ name: 'PrivateLetter' }" replace>私信</router-link>
    </div>
    <div class="tag">
      <router-link :to="{ name: 'Storage' }" replace>收藏</router-link>
    </div>

    <div class="tag">
      <router-link :to="{ name: 'ConcernedPeople' }" replace
        >关注的人</router-link
      >
    </div>
    <div class="tag">
      <router-link :to="{ name: 'MyProduct' }" replace>我的创作</router-link>
    </div>
    <div class="tag">
      <router-link :to="{ name: 'Topic_Circle' }" replace>话题圈</router-link>
    </div>
    <div class="tag">
      <router-link :to="{ name: 'Topic_Circle_Join' }" replace
        >我参与的话题</router-link
      >
    </div>
    <div class="tag">
      <router-link :to="{ name: 'PeopleFollowMe' }" replace
        >谁关注我</router-link
      >
    </div>
    <div class="tag">
      <router-link :to="{ name: 'PersonalCenter' }" replace
        >个人中心</router-link
      >
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  methods: {
    changeAllTrends() {
      this.$router.push({ path: '/main' })
    },
  }

};
</script>

<style scoped>
.tag {
  margin-top: 5px;
  margin-left: 5px;
}
</style>
