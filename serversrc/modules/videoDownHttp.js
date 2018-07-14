var http = require("http");
var fs = require("fs");
var URL = require("url");
var sqlVideo = require("../mysql").video;
var down = video => {
  video.downTime += 1;
  let urlParse = URL.parse(video.source),
    urlFix,
    videoUrl;
  urlFix = urlParse.pathname.split("/");
  urlFix = urlFix[urlFix.length - 1];
  videoUrl = "./dist/videos/" + urlFix;
  video.localUrl = videoUrl;
  function downVideo(url) {
    http
      .get(url, res => {
        if (res.statusCode > 300 && res.statusCode < 400) {
          // 重定向
          return downVideo(res.headers.location);
        }
        if (res.statusCode === 200) {
          console.log(`写入视频${videoUrl}`);
          let stream = fs.createWriteStream(videoUrl);
          stream.on("error", () => {
            reject(video);
            fs.unlink(videoUrl, function(error) {
              console.log("写入视频失败,删除");
            });
          });
          res.on("data", res => {
            stream.write(res);
          });

          res.on("end", () => {
            stream.end();
            console.count("视频下载完啦  开始下一个吧");
            resolve(video);
          });
        } else {
          reject(video);
        }
      })
      .on("error", () => {
        console.log("视频下载玩完了呗");
        reject(video);
      });
  }
  return new Promise((resolve, reject) => {
    fs.exists(videoUrl, exists => {
      if (exists) {
        console.log(`${videoUrl}已存在`);
        sqlVideo.update(
          Object.assign(video, { isDowning: false, isDownComplete: true })
        );
        resolve(video);
      } else {
        downVideo(video.source);
      }
    });
  });
};
module.exports = down;
