var httpGet = require("./tools/http").httpGet;
var Video = require("./modules/viedo");
var TaskControll = require("./units").TaskControll;
var taskControll = new TaskControll({ maxTaskNum: 2 });
var time = 0;
module.exports = url => {
  var _time = ++time;
  taskControll.add({
    run: (successHandle, errorHandle) => {
      httpGet(url).then(
        ({ $, html }) => {
          successHandle();
          console.log(`这是第${_time}个列表`);
          $(".videos>li").each((index, el) => {
            new Video($(el));
          });
        },
        e => {
          errorHandle(e);
        }
      );
    }
  });
};
