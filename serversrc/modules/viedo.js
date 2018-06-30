var httpGet = require("../tools/http").httpGet;
var config = require("../config");
var downConfig = {
  max: 5,
  willDown: [],
  curDown: []
};
var videoControll = require("./videoControll");

class Video {
  constructor($video) {
    this._init($video);
  }

  _init($video) {
    console.log(`初始化视频`);
    this.name = $video.find(".video-title").text();
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

    this.downTime = 0; // 尝试下载次数
    this.isDownComplete = false; // 是否下载
    this.isDowning = false; // 是否在下载中
    console.log(`获取视频资源地址`);
    let { max, willDown, curDown } = downConfig;
    let self = this;

    function add(tempVideo) {
      if (willDown.length >= max) {
        willDown.push(tempVideo);
      } else {
        curDown.push(tempVideo);
        httpGet(`${config.baseUrl}${self.url}`).then(({ $, html }) => {
          var $video = $("video").eq(0);
          self.poster = $video.attr("poster");
          self.source240 = $video
            .find("source")
            .eq(0)
            .attr("src");
          self.source = $video
            .find("source")
            .eq(1)
            .attr("src");
          // videoControll.down(self)
          downNext(self);
        });
      }
    }

    add(this);

    function downNext(video) {
      curDown.splice(curDown.findIndex(item => item === video), 1);
      willDown.length && add(willDown.unshift());
    }
  }
}

module.exports = Video;
