/*
 * @description: umi config entry
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-10 10:04
 */

import plugins from './plugin.config';
import routes from './router.config';
import chainWebpack from './webpack.config';

export default {
  plugins,
  routes,
  ssr: true,
  treeShaking: true,
  targets: {
    // 兼容IE9
    ie: 9,
  },
  publicPath: '/dist/',
  // 配置按需加载
  // extraBabelPlugins: [
  //   [
  //     require.resolve('babel-plugin-import'),
  //     {
  //       libraryName: 'antd',
  //       libraryDirectory: 'es',
  //       style: 'css'
  //     }
  //   ]
  // ],
  chainWebpack,
};
