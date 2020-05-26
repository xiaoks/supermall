module.exports = {
  configureWebpack: {
    resolve: {
      alias: {}
    }
  },
  devServer       : {
    proxy: {
      '/search': {
        target      : 'https://list.mogu.com/',
        ws : true,
        changeOrigin: true,
        // pathRewrite : {
        //   '^/search': ''
        // }
      }
    }
  }

}
