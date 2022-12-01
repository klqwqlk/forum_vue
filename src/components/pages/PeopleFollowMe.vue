<template>
  <div>
    <PeopleFollowMe_List></PeopleFollowMe_List>
  </div>
</template>

<script>

import PeopleFollowMe_List from '../peopleFollowMe/PeopleFollowMe_List.vue';

export default {
  components: {
    PeopleFollowMe_List
  },
  data() {
    return {

    }
  },
  methods: {
  }

};
</script>

<style scoped>
.tag :only-child {
  margin-top: 5px;
  margin-left: 5px;
}
</style>
