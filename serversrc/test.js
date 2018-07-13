var videoDown = require("./modules/videoDown");
var sqlVideo = require("./mysql").video;
sqlVideo
  .searchVideo({
    id: 2013
  })
  .then(res => {
    console.log(res);
    res.forEach(item => {
      item.source = item.source.replace(
        "http://www.aotu46.com",
        "http://www.aotu47.com"
      );
      console.log(item.source);
      videoDown(item);
    });
  });
