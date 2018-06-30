var routerGen = require("express").Router;
let sqlVideo = require("../mysql").video;
let rootRouter = routerGen();
rootRouter.use((res, req, next) => {
  console.log("请求来了");
  next();
});
rootRouter.use("/video/getList", (res, req, next) => {
  sqlVideo.getAllVideo().then(
    result => {
      req.send(result);
    },
    e => req.send([])
  );
});
module.exports = rootRouter;
