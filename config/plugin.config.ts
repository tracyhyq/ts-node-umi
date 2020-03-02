/*
 * @description: plugin.config
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-10 10:04
 */

export default [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: 'pangoo-stater',
      dll: false,
      routes: {
        exclude: [/components\//, /store\//],
      },
    },
  ],
];
