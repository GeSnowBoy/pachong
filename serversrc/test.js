var http = require("http");
var fs = require("fs");
var request = require("request");
var down = video => {
  video.downTime += 1;

  function downVideo(url) {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        console.log(res.statusCode);
        if (res.statusCode > 300 && res.statusCode < 400) {
          // 重定向
          return down(res.headers.location);
        }
        if (res.statusCode === 200) {
          var stream = fs.createWriteStream("./dist/videos/test.mp4");
          res.on("data", res => {
            stream.write(res);
          });
          res.on("end", () => {
            video.isDownComplete = true;
            video.isDowning = false;
            stream.end();
            resolve(video);
          });
        } else {
          reject(video);
        }
      });
    });
  }

  return downVideo(video.source);
};
module.exports = down;
