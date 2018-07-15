<template>
    <div class="pp-video"
         @click="$emit('click',videoData)"
         :title="videoData.name">
        <div class="video-thumb-wrap">
            <img :src="videoData.thumb" alt="">
        </div>
        <div class="video-info">
            <div class="video-name">{{videoData.name}}</div>
            <div class="video-time-wrap">
                <span>{{videoData.publishTime}}</span>
                <span class="video-play-time">时长:{{videoData.duration}}</span>
            </div>
        </div>
    </div>
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
  width: 240px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 40px #ccc;
  margin: 10px;
  text-decoration: none;
  .video-thumb-wrap {
    overflow: hidden;
    width: 100%;
    height: 180px;
    background-color: #e8e8e8;
    img {
      transition: 0.5s all;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .video-info {
    .video-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-align: left;
      margin: 10px 0;
      line-height: 25px;
      height: 50px;
      color: #333;
    }
    .video-time-wrap {
      font-size: 14px;
      color: #ccc;
      text-align: left;
    }
    .video-play-time {
      float: right;
    }
  }
}
</style>
