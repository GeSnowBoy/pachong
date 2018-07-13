var sqlVideo = require("./mysql").video;
var path = require("path");
var fs = require("fs");
var pool = require("./mysql/pool");
pool(
  `SELECT * FROM videos  v WHERE isCheckGood != 1 and isDownComplete = 1`
).then(res => {
  console.log(res.length);
  res.forEach(item => {
    if (!item.localUrl) {
      resetVideo(item);
    } else {
      let videoPath = path.resolve(__dirname, "../" + item.localUrl);
      fs.stat(videoPath, (error, data) => {
        if (error) return resetVideo(item);
        if (data.size < 1024 * 1024 * 0.5) {
          resetVideo(item);
          fs.unlink(videoPath);
        } else {
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
      localUrl: null,
      isCheckGood: 0
    })
  );
}
