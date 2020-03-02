/*
 * @description: 列表主页面
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-28 16:12:45
 */

import * as React from 'react';
import { observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Table } from 'antd';
import { IListItem } from '@I/server/list';
import listStore from './listStore';
const styles = require('./index.css');

interface IProps extends RouteComponentProps<{}> {
  list: IListItem[];
}
interface IState {
  loaded: boolean;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    render(text: string, record: IListItem) {
      return <Link to={`/list/${record.key}`}>{text}</Link>;
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
];

@observer
export default class List extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // ssr的数据会自动传入props
    const { list } = props;
    listStore.listData = list;
  }

  /**
   * 页面初始化请求数据请求数据
   * @param {*}
   * {
   *  route （当前路由信息）
   *  location (history 对象有 location, query, ...)
   *  store（需开启 `dva: true`，`store.dispatch()` 会返回 Promise）
   *  isServer (是否为服务端执行环境)
   *  req (HTTP Request 对象，只存在于 Server 端)
   *  res (HTTP Response 对象，只存在于 Server 端)
   * }
   */
  static async getInitialProps() {
    const res = await listStore.fetchList();
    return {
      list: res,
    };
  }

  /**
   * 当采用spa渲染时，需要重新拉取数据
   */
  async componentDidMount() {
    listStore.listData = await listStore.fetchList();
  }

  createPagination = () => {
    const { listData } = listStore;

    return {
      total: listData && listData.length ? listData.length : 0,
      showSizeChanger: true,
      onShowSizeChange(current: number, pageSize: number) {
        console.log(`Current: ${current}; PageSize: ${pageSize}`);
      },
      onChange(current: number) {
        console.log(`Current: ${current}`);
      },
    };
  };

  render() {
    return (
      <div className={styles.list}>
        列表页
        <Table
          columns={columns}
          dataSource={listStore.listData}
          pagination={this.createPagination()}
        />
      </div>
    );
  }
}
