/*
 * @description: article service
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-07 13:57
 */

import { IArticle, IArticleItem, IArticleListRequest } from '@I/server/article';
import { HttpUtil } from '@serverUtils/axios';

const prefix = 'https://api.douban.com';

class ArticleService {
  async getArticle(params: IArticleListRequest): Promise<IArticle> {
    return await HttpUtil.get<IArticle>(
      `${prefix}/v2/book/search`,
      {
        params,
        validateStatus: () => {
          return true;
        },
      },
      true
    );
  }

  async getArticleDetail(
    id: string | number,
    params: IArticleListRequest
  ): Promise<IArticleItem> {
    return await HttpUtil.get<IArticleItem>(
      `${prefix}/v2/book/${id}`,
      {
        params,
        validateStatus: () => {
          return true;
        },
      },
      true
    );
  }
}

export default new ArticleService();
