var httpGet = require("../tools/http").httpGet;
var config = require("../config");
var sqlVideo = require("../mysql/model/video");
var TaskControll = require("../units").TaskControll;
var taskControll = new TaskControll({ maxTaskNum: 20 });
setInterval(() => {
  console.log(taskControll.willTaskList.length);
}, 2000);

class Video {
  constructor($video) {
    this._init($video);
  }

  _init($video) {
    this.name = $video.find(".video-title").text();
    sqlVideo.searchVideo({ name: this.name }).then(
      res => {
        if (res[0] && res[0].isDownComplete) return;
        this.url = $video.find("a").attr("href");
        this.thumb = $video.find(".video-thumb>img").attr("src"); //缩略图
        this.duration = $video.find(".video-duration").text(); //时间
        this.rating = $video
          .find(".video-rating")
          .text()
          .replace(/[\n\t]/g, ""); //点赞
        this.publishTime = $video
          .find(".video-added")
          .text()
          .replace(/[\n\t]/g, ""); //发布时间
        this.views = +$video.find(".video-views").text(); //关看数

        if (!res.length) {
          this.downTime = 0; // 尝试下载次数
          this.isDownComplete = false; // 是否下载
          this.isDowning = false; // 是否在下载中
        }
        taskControll.add({
          run: (successHandle, errorHandler) => {
            console.count("统计调用video");
            httpGet(`${config.baseUrl}${this.url}`)
              .then(({ $, html }) => {
                // console.log(`获取视频信息成功${config.baseUrl}${this.url}`)
                var $video = $("video").eq(0);
                this.poster = $video.attr("poster");
                this.source240 = $video
                  .find("source")
                  .eq(0)
                  .attr("src");
                this.source = $video
                  .find("source")
                  .eq(1)
                  .attr("src");
                if (!res.length) {
                  sqlVideo.insertVideo(this).then(successHandle, errorHandler);
                } else {
                  for (const key in this) {
                    if (typeof this[key] === "boolean") {
                      this[key] = this[key] ? 1 : 0;
                    }
                  }
                  console.count("视频更新");
                  sqlVideo
                    .update(Object.assign({}, res[0], this))
                    .then(successHandle, errorHandler);
                }
              })
              .catch(errorHandler);
          }
        });
      },
      () => {
        console.log(`数据库查电影出错啦`);
      }
    );
  }
}

module.exports = Video;
