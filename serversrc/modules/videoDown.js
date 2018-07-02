var videoDownHttp = require("./videoDownHttp");
var sqlVideo = require("../mysql").video;
var TaskControll = require("../units").TaskControll;
var taskControll = new TaskControll({ maxTaskNum: 10 });
module.exports = video => {
  taskControll.add({
    run: (successHandle, errorHandle) => {
      videoDownHttp(video).then(theVideo => {
        Object.assign(theVideo, { isDownComplete: 1, isDowning: 0 });
        sqlVideo.update(theVideo);
        successHandle();
      }, errorHandle);
    }
  });
};
