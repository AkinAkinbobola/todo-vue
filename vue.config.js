const { defineConfig } = require('@vue/cli-service')
const path = require("path")
// require("dotenv").config()

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "../server/public"),
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: process.env.VUE_API,
        },
      },
    },
  },
})
