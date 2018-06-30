module.exports = {
  devServer: {
    proxy: {
      "/proxy1": {
        target: "http://localhost:8031/", // 测试
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/proxy1": "/" // remove base path
        }
      }
    }
  }
};
