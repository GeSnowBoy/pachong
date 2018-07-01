<template>
    <a class="pp-video" target="_blank" :href="videoData.source">
        <div class="video-thumb-wrap">
            <img :src="videoData.thumb" alt="">
        </div>
        <div class="video-info">
            <div class="video-name">{{videoData.name}}</div>
            <div>
                {{videoData.publishTime}}
                <span>{{videoData.duration}}</span>
            </div>
        </div>
    </a>
</template>

<script>
export default {
  name: "ppVideo",
  props: {
    videoData: {
      require: true,
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.pp-video {
  display: inline-block;
}
</style>
