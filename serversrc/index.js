let express = require("express");
let app = express();
let apis = require("./apis");

app.use("/api", apis);
app.listen(8031);
