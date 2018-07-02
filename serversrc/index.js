let express = require("express");
let app = express();
let apis = require("./apis");
var videoDown = require("./modules/videoDown");
var sqlVideo = require("./mysql").video;
sqlVideo
  .searchVideo({
    isDownComplete: 0
  })
  .then(res => {
    res.forEach(item => {
      videoDown(item);
    });
  });
app.use("/api", apis);
app.listen(8031);
