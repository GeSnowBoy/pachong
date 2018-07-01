var httpGet = require("../tools/http").httpGet;
var config = require("../config");
var sqlVideo = require("../mysql/model/video");
var TaskControll = require("../units").TaskControll;
var taskControll = new TaskControll({ maxTaskNum: 20 });

var videoControll = require("./videoControll");

class Video {
  constructor($video) {
    this._init($video);
  }

  _init($video) {
    this.url = $video.find("a").attr("href");
    sqlVideo.searchVideo({ url: this.url }).then(
      res => {
        if (!res.length) {
          this.name = $video.find(".video-title").text();
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

          this.downTime = 0; // 尝试下载次数
          this.isDownComplete = false; // 是否下载
          this.isDowning = false; // 是否在下载中
          taskControll.add({
            run: (successHandle, errorHandler) => {
              httpGet(`${config.baseUrl}${this.url}`)
                .then(({ $, html }) => {
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
                  sqlVideo.insertVideo(this).then(successHandle, errorHandler);
                })
                .catch(errorHandler);
            }
          });
        }
      },
      () => {
        console.log(`数据库查电影出错啦`);
      }
    );
  }
}

module.exports = Video;
