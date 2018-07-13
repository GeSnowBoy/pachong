let express = require("express");
let app = express();
let apis = require("./apis");
var videoDown = require("./modules/videoDown");
var sqlVideo = require("./mysql").video;
sqlVideo
  .searchVideo({
    isDownComplete: 1
  })
  .then(res => {
    console.log(`已下载数量${res.length}`);
  });
sqlVideo
  .searchVideo({
    isDownComplete: 0
  })
  .then(res => {
    console.log(`剩余下载数量${res.length}`);
    res.forEach(item => {
      if (item.source && item.source.indexOf("aotu47") !== -1) {
        videoDown(item);
      }
    });
  });
app.use("/api", apis);
app.listen(8031);
