/*
 * @description: 根路径主页
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-02-04 12:12:45
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default function home() {
  return (
    <div className="home-wrap">
      <Link to="/list">List 列表页</Link>
      <Link to="/article">Article 列表页</Link>
    </div>
  );
}
