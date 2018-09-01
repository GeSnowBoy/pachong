var pool = require("../pool");
module.exports = {
  getAllNovel() {
    //监听connection事件
    return pool("select * from novels");
  },
  getNovel() {},
  insertNovel(novel) {
    var keys = Object.keys(novel),
      values = Object.values(novel);
    //增加数据
    var addsql = `INSERT INTO novels(${keys}) VALUES(${keys.map(() => "?")})`;
    return pool(addsql, values);
  },
  searchNovel(novel) {
    var sqlFilter = Object.keys(novel)
      .map(
        key =>
          novel[key] === null ? `ISNULL(${key})` : `${key} = '${novel[key]}'`
      )
      .join(" and ");
    //增加数据
    var addsql = `SELECT * FROM novels WHERE ${sqlFilter}`;

    return pool(addsql);
  },
  update(novel) {
    for (const key in novel) {
      if (typeof novel[key] === "boolean") {
        novel[key] = novel[key] ? 1 : 0;
      }
    }
    var setSql =
      Object.keys(novel)
        .map(key => {
          return `${key} = '${novel[key]}'`;
        })
        .join(",") + `WHERE id = ${novel.id}`;
    var sql = `UPDATE novels SET ${setSql}`;
    return pool(sql);
  }
};
