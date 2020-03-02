/*
 * @description: article 列表
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-02-04 16:12:45
 */
// tslint:disable:no-any
import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Card, Tag, Statistic } from 'antd';
import { IArticleItem, ITagItem } from '@I/server/article';
import { shuffle } from '@utils/common';
import articleStore from './articleStore';
const styles = require('./index.css');

interface ArticleProps {
  ip?: string;
  articles: IArticleItem[];
}

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 + 1000 * 30;
const counts = shuffle(
  Array.from({ length: 5 }).map((i, v) => v),
  3
);
const tagColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

@observer
export default class Article extends React.Component<ArticleProps> {
  constructor(props: ArticleProps) {
    super(props);

    articleStore.articles = props.articles;
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
  static async getInitialProps(ctx: any) {
    const res = await articleStore.getArticleList();
    return {
      articles: res,
      ip: ctx.req.ip,
    };
  }

  /**
   * 当采用spa渲染时，需要重新拉取数据
   */
  async componentDidMount() {
    articleStore.articles = await articleStore.getArticleList();
  }

  render() {
    const { ip } = this.props;
    const { articles } = articleStore;

    return (
      <div className="article">
        {ip ? <h2>当前IP: {{ ip }} </h2> : null}
        <Row>
          {articles
            ? articles.map((item: IArticleItem, index: number) => {
                return (
                  <Col span={6} key={index}>
                    <Card
                      className={styles.articleCard}
                      size="small"
                      title={
                        <Link to={`/article/${item.id}`}>
                          &nbsp;{item.title + ` (¥:${item.price})`}
                        </Link>
                      }
                      extra={
                        counts.includes(index) ? (
                          <Countdown
                            title="抢购倒计时"
                            value={deadline + 1000 * 60 * 60 * 24 * index}
                            format="HH:mm:ss:SSS"
                          />
                        ) : null
                      }
                    >
                      {/*图片做了防盗链*/}
                      <img className={styles.articleImage} src={item.image} />
                      <div style={{ padding: '14px' }}>
                        <div className="bottom clearfix">
                          {item.tags.length
                            ? item.tags.map(
                                (tag: ITagItem, tagIndex: number) => {
                                  return (
                                    <Tag
                                      className={styles.articleTag}
                                      key={tagIndex}
                                      color={tagColors[tagIndex % 11]}
                                    >
                                      {tag.name}
                                    </Tag>
                                  );
                                }
                              )
                            : null}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })
            : null}
        </Row>
      </div>
    );
  }
}
