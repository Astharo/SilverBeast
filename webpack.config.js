const webpack = require('atool-build/lib/webpack');
const path = require('path');

module.exports = function (webpackConfig, env) {
  // 1. 如需添加私有图标，可在如下的 svgDirs 数组中加入本地 svg 文件路径
  const svgDirs = [
    path.resolve(__dirname, './src/assets'),  // 自己私人的 svg 存放目录
  ];

  // 2. 把属于 antd-mobile 内置 svg 文件也加入进来
  const antdDir = require.resolve('antd-mobile').replace(/warn\.js$/, '');
  svgDirs.push(antdDir);


  // 3. 因为一个 SVG 文件不能被处理两遍. exclude 掉 atool-build 默认为svg配置的svg-url-loade
  // https://github.com/ant-tool/atool-build/blob/e4bd2959689b6a95cb5c1c854a5db8c98676bdb3/src/getWebpackCommonConfig.js#L161
  // https://github.com/kisenka/svg-sprite-loader/issues/4
  webpackConfig.module.loaders.forEach(loader => {
    // if (loader.test && loader.test.toString() === '/\\.svg(\\?v=\\d+\\.\\d+\\.\\d+)?$/') {
    if (loader.test && loader.test.toString().startsWith("/\\.svg")) {
      loader.exclude = svgDirs;
    }
  });
  // 4. 配置 webpack loader
  webpackConfig.module.loaders.unshift({
    test: /\.(svg)$/i,
    loader: 'svg-sprite',
    include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
  });

  // webpackConfig.module.loaders.unshift({
  //   test: /\.(jpe?g|png|gif|svg)$/i, loader: `url?limit=2048`,
  // })

  webpackConfig.externals = {
    // 'wx': 'jWeixin',
    // 'ngr': 'window.NGR',
  };

  webpackConfig.resolve.alias = {
    'lib': path.join(__dirname, 'src', 'utils'),
    'services': path.join(__dirname, 'src', 'services'),
    'shared': path.join(__dirname, 'src', 'shared'),
    'components': path.join(__dirname, 'src', 'components'),
    'routes': path.join(__dirname, 'src', 'routes'),
    'config': path.join(__dirname, 'src', 'config'),
    'assets': path.join(__dirname, 'src', 'assets'),
    'styles': path.join(__dirname, 'src', 'styles'),
    'public': path.join(__dirname, 'public'),
  };

  return webpackConfig;
}
