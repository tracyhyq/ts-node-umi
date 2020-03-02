/*
 * @description: 获取文章demo路由
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-06 11:37
 */

import Router from 'koa-router';
import Koa from 'koa';
import ArticleService from '@server/service/article';
import { IArticle, IArticleItem, IArticleListRequest } from '@I/server/article';

const articleRouter = new Router();

const Handlers = {
  /**
   * @name: getArticleList 获取列表数据
   * @param ctx
   * @param next
   */
  getArticleList: async (
    ctx: Koa.ExtendableContext,
    next: Function
  ): Promise<IArticleItem[]> => {
    const params: IArticleListRequest = ctx.request.query;
    ctx.logger.info(params);
    const listPromise: IArticle = await ArticleService.getArticle(params);

    ctx.body = listPromise.books;
    return listPromise.books;
  },

  /**
   * @name: getArticleDetail 获取详情数据
   * @param ctx
   * @param next
   */
  getArticleDetail: async (
    ctx: Koa.ExtendableContext,
    next: Function
  ): Promise<IArticleItem> => {
    const id = ctx.request.query.id;
    const params = { apikey: ctx.request.query.apikey };
    const detailPromise: IArticleItem = await ArticleService.getArticleDetail(
      id,
      params
    );

    ctx.body = detailPromise;
    return detailPromise;
  },
};

articleRouter.get('/getArticleList', Handlers.getArticleList);
articleRouter.get('/getArticleDetail', Handlers.getArticleDetail);

export default articleRouter;
