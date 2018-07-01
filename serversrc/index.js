var getRadioList = require("./main"),
  baseUrl = require("./config").baseUrl;
for (let i = 700; i < 796; i++) {
  getRadioList(baseUrl + "recent/" + i + "/");
}

let express = require("express");
let app = express();
let apis = require("./apis");

app.use("/api", apis);
app.listen(8031);
