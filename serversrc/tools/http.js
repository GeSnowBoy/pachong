var http = require("http");
var https = require("https");
var cheerio = require("cheerio");
var fs = require("fs");
var URL = require("url");
exports.httpGet = url => {
  return httpGetPromise(url).then(res => {
    return new Promise(resolve => {
      let html = "";
      res.on("data", chunk => (html += chunk));
      res.on("end", () => {
        resolve({ $: cheerio.load(html), html });
      });
    });
  });
};
exports.fileHttpGet = url => {
  return httpGetPromise(url).then(res => {
    return new Promise(resolve => {
      let html = "";
      res.on("data", chunk => (html += chunk));
      res.on("end", () => {
        resolve({ $: cheerio.load(html), html });
      });
    });
  });
};
exports.httpGetPromise = httpGetPromise;

function httpGetPromise(url) {
  return new Promise((resolve, reject) => {
    _httpGet(url, resolve, reject);
  }).catch(e => {
    console.log(e);
    console.log(`${url}获取有问题`);
  });
}

function _httpGet(url, successHandle, errorHandle) {
  let request = url.split(":")[0] === "http" ? http : https;
  request
    .get(encodeURI(url), res => {
      if (res.statusCode > 300 && res.statusCode < 400) {
        // 重定向
        _httpGet(res.headers.location, successHandle, errorHandle);
      } else if (res.statusCode === 200) {
        res.setEncoding("utf-8"); //防止中文乱码
        successHandle(res);
      } else {
        errorHandle(res);
      }
    })
    .on("error", errorHandle);
}
