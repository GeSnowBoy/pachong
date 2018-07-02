var pool = require("../pool");
module.exports = {
  getAllVideo() {
    //监听connection事件
    return pool("select * from videos");
  },
  getVideo() {},
  insertVideo(video) {
    var keys = Object.keys(video),
      values = Object.values(video);
    //增加数据
    var addsql = `INSERT INTO videos(${keys}) VALUES(${keys.map(() => "?")})`;
    return pool(addsql, values);
  },
  searchVideo(video) {
    var sqlFilter = Object.keys(video)
      .map(key => `${key} = '${video[key]}'`)
      .join(" and ");
    //增加数据
    var addsql = `SELECT * FROM videos WHERE ${sqlFilter}`;

    return pool(addsql);
  },
  update(video) {
    var setSql =
      Object.keys(video)
        .map(key => {
          return `${key} = '${video[key]}'`;
        })
        .join(",") + `WHERE id = ${video.id}`;
    var sql = `UPDATE videos SET ${setSql}`;
    return pool(sql);
  }
};
