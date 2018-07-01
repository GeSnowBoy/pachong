var sqlVideo = require("./mysql").video;
sqlVideo
  .searchVideo({
    id: 1474
  })
  .then(
    res => {
      console.log(res.length);
    },
    res => {
      console.log(res);
    }
  );
