var videoDownHttp = require("./videoDownHttp");

class VideoControll {
  constructor() {
    this.downConfig = {
      max: 3, //最大同时下载数量
      willDown: [], // 将要下载的video
      downIng: [], // 正在下载的video
      errorDown: [], // 失败的video
      successDown: [] // 成功的video
    };
  }

  down(video) {
    let { max, willDown, downIng } = this.downConfig;
    if (max <= downIng.length) {
      willDown.push(video);
    } else {
      downIng.push(video);
      this.videoSourceDown(video);
    }
  }

  videoSourceDown(video) {
    videoDownHttp(video).then(video => {
      video.isDownComplete = true;
      video.isDowning = false;
      let { downIng, successDown } = this.downConfig;
      downIng.splice(downIng.findIndex(item => item === video), 1);
      successDown.push(video);
      this.downNextVideo();
    });
  }

  downNextVideo() {
    console.log(`下载下一个视频啦`);
    let { willDown } = this.downConfig;
    if (willDown.length) {
      this.down(willDown.shift());
    }
  }
}

module.exports = new VideoControll();
