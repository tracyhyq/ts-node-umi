/*
 * @description: article secvice
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-10 14:16
 */

import { observable, action } from 'mobx';
import { HttpUtil } from '@utils/http-util';
import { IArticleItem } from '@I/server/article';

const secrets = {
  [Symbol('apikey')]: '0df993c66c0c636e29ecbb5344252a4a',
};

const key = Object.getOwnPropertySymbols(secrets)[0];

const params = {
  tag: encodeURI('科幻'),
  count: 5,
  // @ts-ignore
  apikey: secrets[key],
};

class ArticleStore {
  @observable
  articles: IArticleItem[] = [];

  @observable
  articleDetail: IArticleItem;

  @observable
  ip: string;

  @action
  getArticleList = async () => {
    return await HttpUtil.get<IArticleItem[]>('/api/article/getArticleList', {
      params,
    });
  };

  @action
  getArticleDetail = async (id: string | number) => {
    return await HttpUtil.get<IArticleItem>('/api/article/getArticleDetail', {
      params: {
        id,
        // @ts-ignore
        apikey: secrets[key],
      },
    });
  };
}

export default new ArticleStore();
