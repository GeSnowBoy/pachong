// require('./main')

let express = require("express");
let app = express();
let apis = require("./apis");
app.get("/", function(req, res) {
  res.send("hello world");
});
app.use("/api", apis);
app.listen(8031);
