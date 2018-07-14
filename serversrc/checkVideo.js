var sqlVideo = require("./mysql").video;
var path = require("path");
var fs = require("fs");
var pool = require("./mysql/pool");
pool(`SELECT * FROM videos  v WHERE isCheckGood != 1`).then(res => {
  console.log(res.length);
  res.forEach(item => {
    if (!item.localUrl || item.localUrl === "null") {
      console.count(`未下载的`);
      resetVideo(item);
    } else {
      let videoPath = path.resolve(__dirname, "../" + item.localUrl);
      fs.stat(videoPath, (error, data) => {
        if (error) return resetVideo(item);
        if (data.size < 1024 * 1024 * 0.5) {
          resetVideo(item);
          console.count(`文件不合格的`);
          fs.unlink(videoPath);
        } else {
          console.count(`通过检查`);
          sqlVideo.update(
            Object.assign({}, item, {
              isCheckGood: 1
            })
          );
        }
      });
    }
  });
});

function resetVideo(video) {
  sqlVideo.update(
    Object.assign({}, video, {
      isDowning: 0,
      isDownComplete: 0,
      isCheckGood: 0
    })
  );
}
