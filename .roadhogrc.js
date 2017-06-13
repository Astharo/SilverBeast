import pxtorem from 'postcss-pxtorem';

export default {
  entry: "src/index.js",
  publicPath: "./",
  autoprefixer: {
    browsers: [
      "iOS >= 8", "Android >= 4"
    ]
  },
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": "css" }]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime"
      ]
    }
  }
}
