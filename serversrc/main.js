var httpGet = require("./tools/http").httpGet;
var fs = require("fs");
var Video = require("./modules/viedo");
var config = require("./config");
var sqlVideo = require("./mysql").video;

httpGet(config.baseUrl).then(({ $, html }) => {
  console.log(`获取视频列表成功`);
  let $viedos = $(".videos>li"),
    videos = [];
  $viedos.each((index, el) => {
    var temp = new Video($(el));
    videos.push(temp);
    // 写入数据库
    sqlVideo.insertVideo(temp);
  });
});
