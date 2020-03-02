/*
 * @description: webpack.config
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-10 10:47
 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

const openBundleAnalyzerPlugin: boolean = false;

const alias: string[] = [
  '@utils src/utils',
  '@components src/components',
  '@services src/services',
  '@I src/interfaces',
  '@root .',
];

const chainWebpack = (config: any) => {
  if (process.env.NODE_ENV === 'development') {
    config.output.publicPath('http://localhost:8000/');
  }

  // 删除进度条插件
  // config.plugins.delete('progress');

  alias.forEach((item: string) => {
    const [name, src] = item.split(' ');
    config.resolve.alias.set(name, path.join(__dirname, '../' + src));
  });

  if (openBundleAnalyzerPlugin) {
    config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]);
  }
};

export default chainWebpack;
