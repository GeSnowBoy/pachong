let msgs = {
  "0": `成功`
};
module.exports = (req, res, next) => {
  res.code = (code, data = []) => {
    res.send({
      code,
      msg: msgs[code] || "未知状态",
      data
    });
  };
  next();
};
