var mysqlConfig = require("./mysql.config");
var mysql = require("mysql");
var pool = mysql.createPool(mysqlConfig);
module.exports = (sqlStr, ...args) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(sqlStr, ...args, (error, result, fields) => {
        // And done with the connection.
        connection.release();

        // Handle error after the release.
        if (error) return reject(error);

        resolve(result, fields);
      });
    });
  }).catch(error => {
    console.log(`***************sql报错信息******************`);
    console.log("code:", error.code);
    console.log("sqlMessage:", error.sqlMessage);
    console.log("sqlState:", error.sqlState);
    console.log("index:", error.index);
    console.log("sql:", error.sql);
    console.log(`***************sql报错信息******************`);
    return Promise.reject(error);
  });
};
