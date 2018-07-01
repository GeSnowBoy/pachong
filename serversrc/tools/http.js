var http = require("http");
var cheerio = require("cheerio");
exports.httpGet = url => {
  return new Promise((resolve, reject) => {
    http
      .get(encodeURI(url), res => {
        if (res.statusCode === 200) {
          res.setEncoding("utf-8"); //防止中文乱码
          let html = "";
          res.on("data", chunk => (html += chunk));
          res.on("end", () => {
            resolve({ $: cheerio.load(html), html });
          });
        } else {
          reject(res);
        }
      })
      .on("error", reject);
  }).catch(() => {
    console.log(`${url}获取有问题`);
  });
};
