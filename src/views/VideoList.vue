<template>
    <div class="video-list-wrap">
        <div class="video-list">
            <pp-video class="video-item" :key="item.name" v-for="item in videos" :video-data="item"/>
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

.page-wrap {
  margin: 50px auto;
  text-align: center;
}
</style>
