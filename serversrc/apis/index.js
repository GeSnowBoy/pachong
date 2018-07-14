var Router = require("express").Router;
var videoRouter = require("./video");

let rootRouter = Router();
rootRouter.use("/video", videoRouter);

module.exports = rootRouter;
