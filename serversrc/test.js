var videoDown = require("./modules/videoDown");
var sqlVideo = require("./mysql").video;
sqlVideo
  .searchVideo({
    id: 2071
  })
  .then(res => {
    videoDown(res[0]);
  });
