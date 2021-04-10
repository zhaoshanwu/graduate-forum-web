<template>
  <div id="post_frame_container" class="post_frame_container">
    <div class="tiny_post" v-if="tiny">
      <span @click="clickPost()">{{post.title}}</span>
    </div>
    <div class="normal_post" v-else>
      <span @click="clickPost()">{{post.postId}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    tiny: Boolean
  },
  methods: {
    clickPost() {
      this.$emit('clickPost', this.post);
    }
  }
}
</script>

<style lang="less" scoped>
  .tiny_post {
    width: 100%;
    height: 50px;
    margin: 10px 0px 10px 0px;
    background-color: #e48900;
  }

  .normal_post {
    width: 100%;
    height: 120px;
    margin: 10px 0px 10px 0px;
    background-color: #f7ea00;
  }
</style>