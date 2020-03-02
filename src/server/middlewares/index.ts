/*
 * @description: 中间件挂载首页
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-15 11:34:15
 */

import * as Koa from 'koa';
import logger from '@fe/pgn-logger';
import resFormatter from '@fe/pgn-response-fomatter';

const { name } = require('../../../package.json');

export default {
  loadMiddlewares: (app: Koa) => {
    // 添加项目日志打印
    app.use(logger(name));
    // 仅针对api开头的url进行格式化处理
    app.use(resFormatter('^/api'));
  },
};
