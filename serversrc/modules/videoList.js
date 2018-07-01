var httpGet = require("../tools/http").httpGet;
var Video = require("./viedo");
var TaskControll = require("../units/index").TaskControll;
var taskControll = new TaskControll({ maxTaskNum: 5 });

module.exports = url => {
  taskControll.add({
    run: (successHandle, errorHandle) => {
      httpGet(url).then(
        ({ $, html }) => {
          successHandle();
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
