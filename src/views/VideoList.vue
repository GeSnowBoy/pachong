<template>
    <div class="video-list-wrap">
        <div class="video-list">
            <pp-video
                    @click="curPlayVideo = $event"
                    class="video-item" :key="item.name" v-for="item in videos" :video-data="item"/>
        </div>
        <div class="play-wrap" v-if="curPlayVideo" @click="curPlayVideo = null">
            <el-button class="close-btn" icon="el-icon-circle-close-outline" circle
                       @click="curPlayVideo = null"></el-button>
            <div @click.stop.prevent>
                <video-player

                        class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                >
                </video-player>
            </div>
        </div>
        <div class="page-wrap">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="getData($event - 1)"
                    :current-page="page.curIndex + 1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.totalNum">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import PpVideo from "@/components/ppVideo";

export default {
  name: "video-list",
  components: { PpVideo },
  data() {
    return {
      curPlayVideo: null,
      videos: [],
      page: {
        size: 10,
        curIndex: 0,
        totalNum: 0
      }
    };
  },
  mounted() {
    this.getData(0, true);
  },
  methods: {
    handleSizeChange(size) {
      this.page.size = size;
      this.getData(this.page.curIndex, true);
    },
    // 获取数据
    getData(curIndex = 0, reload = false) {
      let { page } = this;
      if (page.curIndex !== curIndex || reload) {
        page.curIndex = curIndex;
        this.$ajax
          .post("api/video/getList", page)
          .then(
            ({
              data: {
                msg,
                code,
                data: { list = [], curIndex, totalPage, totalNum, size }
              }
            }) => {
              if (code === 0 && curIndex === page.curIndex) {
                this.videos = list;
                page.totalNum = totalNum;
              }
            }
          );
      }
    }
  },
  computed: {
    playerOptions() {
      let { curPlayVideo } = this;
      return {
        height: "500",
        autoplay: true,
        muted: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0, 3.0, 4.0, 10],
        sources: [
          {
            type: "video/mp4",
            src: `http://192.168.0.108:8031/${curPlayVideo.localUrl.replace(
              "dist/videos/",
              ""
            )}`
          }
        ],
        poster: curPlayVideo.thumb
      };
    }
  }
};
</script>
<style scoped lang="scss">
.page-wrap {
  margin: 50px auto;
  text-align: center;
}

.play-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  min-height: 100%;
  background: #000;
  .close-btn {
    float: right;
    margin: 40px 50px;
    position: relative;
    z-index: 10001;
  }
  .video-player {
    width: 80%;
    margin: 50px auto;
  }
}
</style>
