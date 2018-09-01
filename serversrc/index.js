var { httpGet } = require("./tools/http");
var novelSQL = require("./mysql/model/novel");
var TaskControll = require("./units").TaskControll;
var fs = require("fs");
var URL = require("url");
var taskControll = new TaskControll({ maxTaskNum: 10 });
var taskControll2 = new TaskControll({ maxTaskNum: 10 });
var baseURL = `https://www.76rrbb.com/`;
let novelList = ["list"];
for (let i = 2; i <= 181; i++) {
  novelList.push(`list-all-insert_time-${i}`);
}
novelList.map((item, i) => {
  taskControll.add({
    run: successHandle => {
      try {
        httpGet(`${baseURL}xiaoshuo/${item}.html`).then(res => {
          console.log(`${i}页面获取到了`);
          successHandle();
          getNovelsListHandle(res);
        });
      } catch (e) {
        console.log(`${i}报错了`);
      }
    }
  });
});

function getNovelsListHandle({ $, html }) {
  $(".hy-video-list .item ul li").each((index, el) => {
    let renqi = +$(el)
        .find(".text-overflow .text-color")
        .text(),
      name = $(el)
        .find(".text-overflow a")
        .text(),
      url = $(el)
        .find(".text-overflow a")
        .attr("href");
    novelSQL
      .searchNovel({ url })
      .then(([novel]) => {
        if (!novel) {
          // 插入
          return novelSQL
            .insertNovel({ name, url, renqi })
            .then(res => ({ ...novel, id: res.insertId }));
        }
        return novel;
      })
      .then(novel => {
        if (!novel.localUrl) {
          taskControll2.add({
            run: successCallback => {
              downNovel(novel).then(() => {
                successCallback();
              });
            }
          });
        }
      });
  });
}

function downNovel(novel) {
  novelLocalUrl = `./dist/novels/${novel.name}.txt`;
  return new Promise((resolve, reject) => {
    fs.exists(novelLocalUrl, exists => {
      if (exists) {
        console.log(`${novel.name}小说已存在`);
        novelSQL
          .update({
            ...novel,
            localUrl: novelLocalUrl
          })
          .then(resolve, reject);
      } else {
        httpGet(baseURL + novel.url)
          .then(({ $, html }) => {
            let novelContent = $("#playlist4")
              .text()
              .replace(/(\s{2,})/g, "\r\n");
            fs.writeFile(novelLocalUrl, novelContent, err => {
              if (err) {
                console.log(err);
              }
              novelSQL.update({
                ...novel,
                localUrl: novelLocalUrl
              });
            });
          })
          .then(resolve, reject);
      }
    });
  });
}

// let express = require('express')
// let app = express()
// let bodyParser = require('body-parser')
// let apis = require('./apis')
// let path = require('path')
//
// let middlewareState = require('./middlewares/state')
//
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.static(path.join(__dirname, '../dist/videos/')))
// app.use(middlewareState)
//
// // 启动api
// app.use('/api', apis)
// app.listen(8031)
