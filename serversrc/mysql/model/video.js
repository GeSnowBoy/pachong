var pool = require("../pool");
module.exports = {
  getAllVideo() {
    //监听connection事件
    return pool("select * from videos");
  },
  getVideo() {},
  insertVideo(video) {
    let keys = [],
      values = [];
    for (const key in video) {
      if (video.hasOwnProperty(key)) {
        keys.push(key);
        values.push(video[key]);
      }
    }
    //增加数据
    var addsql = `INSERT INTO videos(${keys}) VALUES(${keys.map(() => "?")})`;
    return pool(addsql, values);
  }
};
