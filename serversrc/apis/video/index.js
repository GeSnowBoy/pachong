var videoRouter = require("express").Router();
let sqlVideo = require("../../mysql").video;
var pool = require("../../mysql/pool");
videoRouter.use("/getList", (req, res, next) => {
  let { size, curIndex } = req.body;
  Promise.all([
    pool(
      `select * from videos where isCheckGood =  '1' limit ${size *
        curIndex},${size}`
    ),
    pool(`select count(*) from videos where isCheckGood = '1'`)
  ]).then(
    ([result, [totalNum]]) => {
      totalNum = totalNum["count(*)"];
      res.code(0, {
        list: result,
        totalNum,
        totalPage: Math.ceil(totalNum / size),
        curIndex,
        size
      });
    },
    e => res.send([])
  );
});
module.exports = videoRouter;
