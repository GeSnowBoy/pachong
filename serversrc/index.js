let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let apis = require("./apis");
let path = require("path");
var videoDown = require("./modules/videoDown");
var sqlVideo = require("./mysql").video;
let meddilewareState = require("./middlewares/state");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../dist/videos/")));
app.use(meddilewareState);
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
    return;

    // res.forEach(item => {
    //   if (item.source && item.source.indexOf('aotu47') !== -1) {
    //     videoDown(item)
    //   }
    // })
  });
app.use("/api", apis);
app.listen(8031);
