/*
 * @description: detail page
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-02-04 13:57
 */

import * as React from 'react';
import { IArticleItem } from '@I/server/article';
import { PageHeader, Collapse } from 'antd';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import articleStore from '../articleStore';

const { Panel } = Collapse;

interface IProps extends RouteComponentProps {
  article: IArticleItem;
  id: string;
}

interface IState {
  activeNames: string[];
}

@observer
export default class Detail extends React.Component<IProps, IState> {
  state = {
    activeNames: ['1'],
  };

  constructor(props: IProps) {
    super(props);
    articleStore.articleDetail = props.article;
  }

  /**
   * 页面初始化请求数据请求数据
   * @param {*} ctx 包含如下参数
   * {
   *  route （当前路由信息）
   *  location (history 对象有 location, query, ...)
   *  store（需开启 `dva: true`，`store.dispatch()` 会返回 Promise）
   *  isServer (是否为服务端执行环境)
   *  req (HTTP Request 对象，只存在于 Server 端)
   *  res (HTTP Response 对象，只存在于 Server 端)
   * }
   */
  // tslint:disable:no-any
  static async getInitialProps(ctx: any) {
    // node 端取得路由的id，id是根据 config/router.config.ts 文件里面定义的名称来取
    const { id } = ctx.route.params;
    const res = await articleStore.getArticleDetail(id);

    return {
      article: res,
    };
  }

  /**
   * 当采用spa渲染时，需要重新拉取数据
   */
  async componentDidMount() {
    // 前端获取url参数
    // @ts-ignore
    const { id } = this.props.match.params;
    articleStore.articleDetail = await articleStore.getArticleDetail(id);
  }

  render() {
    const { history } = this.props;

    if (!articleStore.articleDetail) {
      return null;
    }
    return (
      <div className="detail-container">
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => {
            history.push('/article');
          }}
          title="详情"
          subTitle="具体信息"
        />
        <Collapse defaultActiveKey={this.state.activeNames}>
          <Panel header="目录 Catalog" key="1">
            <p>{articleStore.articleDetail.catalog}</p>
          </Panel>
          <Panel header="作者 author_intro" key="2">
            <p>{articleStore.articleDetail.author_intro}</p>
          </Panel>
          <Panel header="概述 summary" key="3">
            <p>{articleStore.articleDetail.summary}</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}
