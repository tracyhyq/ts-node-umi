/*
 * @description: 获取列表数据demo路由
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-22 14:12:50
 */

import Router from 'koa-router';
import Koa from 'koa';
import ListService from '@server/service/list';
import { IListItem } from '@I/server/list';

const listRouter = new Router();

const Handlers = {
  /**
   * @name: getList 获取列表数据
   * @param ctx
   * @param next
   */
  getList: async (
    ctx: Koa.ExtendableContext,
    next: Function
  ): Promise<IListItem[]> => {
    const params = ctx.request.query;
    ctx.logger.info(params);
    const listPromise = ListService.getList();
    const [listData] = await Promise.all([listPromise]);

    const result = listData;
    ctx.body = result;
    return result;
  },
  /**
   * @name: getDetail 获取详情数据
   * @param ctx
   * @param next
   */
  getDetail: async (
    ctx: Koa.ExtendableContext,
    next: Function
  ): Promise<IListItem> => {
    const key = ctx.request.query.key;
    const detailPromise = ListService.getDetailByKey(key);
    const [detailData] = await Promise.all([detailPromise]);

    const result = detailData;
    ctx.body = result;
    return result;
  },
};

listRouter.get('/listData', Handlers.getList);
listRouter.get('/detail', Handlers.getDetail);

export default listRouter;
