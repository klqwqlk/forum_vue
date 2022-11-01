<template>
  <div>
    <ConcernedPeople_ListVue></ConcernedPeople_ListVue>
  </div>
</template>

<script>

import ConcernedPeople_ListVue from '../concernedPeople/ConcernedPeople_List.vue';

export default {
  components: {
    ConcernedPeople_ListVue
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
