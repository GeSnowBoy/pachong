var promisify = require("util").promisify;
var fs = require("fs");
var path = require("path");
var basePath = path.resolve(__dirname, "../../dist/videos");
fs.readdir(basePath, (err, data) => {
  if (err) {
    console.log(`读取列表错误`);
    return;
  }
  var time = 0;
  data.forEach(video => {
    let videoPath = path.resolve(basePath, video);
    fs.stat(videoPath, (err, videoState) => {
      if (err) {
        console.log("读取失败");
        return;
      }
      if (videoState.size < 1024 * 1024 * 0.5) {
        console.log(videoState.size);
        fs.unlink(videoPath, function(err, deleteData) {
          console.log(deleteData);
        });
      }
    });
  });
  console.log(time);
});
module.exports = {
  unlink: promisify(fs.unlink)
};
