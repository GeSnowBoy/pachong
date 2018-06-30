var http = require("http");
var fs = require("fs");
var URL = require("url");
var down = video => {
  video.downTime += 1;
  let urlParse, urlFix, videoUrl;

  function downVideo(url) {
    return new Promise((resolve, reject) => {
      urlParse = URL.parse(url);
      urlFix = urlParse.pathname.split("/");
      urlFix = urlFix[urlFix.length - 1];
      videoUrl = "./dist/videos/" + urlFix;
      fs.exists(videoUrl, exists => {
        if (exists) {
          console.log(`${videoUrl}已存在`);
          resolve(video);
        } else {
          http.get(url, res => {
            if (res.statusCode > 300 && res.statusCode < 400) {
              // 重定向
              return downVideo(res.headers.location).then(resolve, reject);
            }
            if (res.statusCode === 200) {
              console.log(`写入视频${videoUrl}`);
              let stream = fs.createWriteStream(videoUrl);
              res.on("data", res => {
                stream.write(res);
              });
              res.on("end", () => {
                stream.end();
                console.log("视频下载完啦  开始下一个吧");
                resolve(video);
              });
            } else {
              reject(video);
            }
          });
        }
      });
    });
  }

  return downVideo(video.source);
};
module.exports = down;
