/*
 * @description: 默认公共配置文件
 * @author: heyanqiu
 * @LastEditors: heyanqiu
 * @LastEditTime: 2020-02-04 10:04
 */

export default {
  port: 3004,
  isDev: false,
  domain: 'http://localhost:3004',
  // 以下列表不走ssr
  ssrProxyIgnore: ['/api', '/bssologin', '/pageentry', '/health'],
};
