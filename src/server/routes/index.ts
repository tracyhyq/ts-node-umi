/*
 * @description: 路由出口页
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-19 11:33:42
 */

import Router from 'koa-router';
import listRouter from './list';
import articleRouter from './article';

const apiRouter = new Router();

apiRouter.use('/list', listRouter.routes(), listRouter.allowedMethods());
apiRouter.use('/article', articleRouter.routes(), listRouter.allowedMethods());

export default apiRouter;
