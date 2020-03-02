/*
 * @description: router.config.ts
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-10 10:04
 */

// tips: component 是相对于 src/pages 目录的 执行在.umi中
export default [
  {
    path: '/',
    component: '../layouts/index',
    // Routes: [`src/pages/authorized`],
    routes: [
      { path: '/', component: '../pages/index' },
      { path: '/list', component: '../pages/list/index' },
      { path: '/list/:id?', component: '../pages/list/detail/index' },
      { path: '/article', component: '../pages/article/index' },
      { path: '/article/:id?', component: '../pages/article/detail/index' },
    ],
  },
];
