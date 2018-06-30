<template>
    <div class="about">
        <div class="video-list">
            <pp-video class="video-item" :key="item.name" v-for="item in videos" :video-data="item"/>
        </div>
    </div>
</template>
<script>
import ppVideo from "@/components/ppVideo";

export default {
  name: "about",
  components: { ppVideo },
  data() {
    return {
      videos: []
    };
  },
  mounted() {
    this.$ajax
      .post("api/video/getList", {
        page: {
          size: 10,
          curIndex: 0
        }
      })
      .then(res => {
        this.videos = res.data;
      });
  }
};
</script>
<style scoped lang="scss">
.about {
  .video-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .video-item {
    flex: 1;
  }
}
</style>
