var videoListDown = require("./modules/videoList");
for (let i = 2; i < 780; i++) {
  videoListDown(`http://www.aotu47.com/recent/${i}/`);
}
