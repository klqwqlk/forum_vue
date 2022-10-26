<template>
  <div>get_user : {{ userId }}</div>
</template>

<script>

export default {
  data() {
    return {
      userId: ''
    }
  },
  methods: {
    getUrlParam() {
      var tem = this.$route.query.id;
      if (tem.length > 0) {
        this.userId = tem;
      }

    }
  },
  mounted() {
    this.getUrlParam();
  },

};
</script>
