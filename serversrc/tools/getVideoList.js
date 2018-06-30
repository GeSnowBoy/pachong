var fs = require("fs");
var cheerio = require("cheerio");
exports.getVideoList = function(html) {
  var $ = cheerio.load(html); //采用cheerio模块解析html

  var videoList = [];
  $(".item").each(function(index, item) {
    try {
      videoList.push({
        title: $(this)
          .children("a")
          .attr("title"), //标题
        decsURL: $(this)
          .children("a")
          .attr("href"), //详细信息地址
        thumb: $(this)
          .find(".thumb")
          .attr("data-original"), //缩略图
        duration: $(this)
          .find(".duration")
          .text(), //时间
        rating: $(this)
          .find(".rating")
          .text()
          .replace(/\n/g, "")
          .replace(/\t/g, ""), //点赞
        views: $(this)
          .find(".views")
          .text() //敢看数
      });
    } catch (e) {
      console.log(e);
    }
  });

  fs.appendFile(
    "./data/" + "video" + ".json",
    JSON.stringify(videoList),
    "utf-8",
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(videoList);
        return videoList;
      }
    }
  );
};
