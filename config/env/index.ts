/*
 * @description: 合并配置文件
 * @author: heyanqiu
 * @LastEditors: heyanqiu
 * @LastEditTime: 2020-02-04 10:04
 */

import base from './base';
import development from './development';
import test from './test';
import production from './production';

const envMap: {
  [key: string]: Object;
} = {
  development,
  test,
  production,
};

export default function(runtime: string) {
  const env = envMap[runtime];

  return Object.assign(base, env);
}
